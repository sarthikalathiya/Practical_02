// Shop Schedule Configuration
const SHOP_SCHEDULE = [
    {
      day: 'Mon',
      open: '07:00 AM',
      close: '07:00 PM'
    },
    {
      day: 'Tue',
      open: '07:00 AM',
      close: '07:00 PM'
    },
    {
      day: 'Thu',
      open: '07:00 AM',
      close: '07:00 PM'
    },
    {
      day: 'Fri',
      open: '07:00 AM',
      close: '07:00 PM'
    }
  ];
  
  // Function to convert time string to minutes for easier comparison
  function convertTimeToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  }
  
  // Function to check if shop is currently open
  function isShopOpen() {
    const now = new Date();
    
    // Get current day abbreviation (Mon, Tue, etc.)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[now.getDay()];
    
    // Get current time in minutes
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    
    // Find today's schedule
    const todaySchedule = SHOP_SCHEDULE.find(schedule => schedule.day === currentDay);
    
    // If today is not in the schedule, shop is closed
    if (!todaySchedule) {
      return false;
    }
    
    // Convert shop open and close times to minutes
    const openTimeInMinutes = convertTimeToMinutes(todaySchedule.open);
    const closeTimeInMinutes = convertTimeToMinutes(todaySchedule.close);
    
    // Check if current time is within open and close times
    return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
  }
  
  // Get shop status
  function getShopStatus() {
    return isShopOpen() ? "Open" : "Closed";
  }
  
  // Display shop status
  console.log(getShopStatus()); 