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
  
// Constants
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

// Utility functions
function getCurrentTimeInfo() {
  const now = new Date();
  return {
    day: DAYS[now.getDay()],
    timeInMinutes: now.getHours() * MINUTES_IN_HOUR + now.getMinutes(),
    dayIndex: now.getDay()
  };
}

function convertTimeToMinutes(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours * MINUTES_IN_HOUR + minutes;
}

function roundToDecimal(number) {
  return Math.round(number * 10) / 10;
}

function getScheduleForDay(day) {
  return SHOP_SCHEDULE.find(schedule => schedule.day === day);
}

function calculateHoursDifference(currentMinutes, targetMinutes) {
  return (targetMinutes - currentMinutes) / MINUTES_IN_HOUR;
}

// Core functions
function isShopOpen() {
  const { day, timeInMinutes } = getCurrentTimeInfo();
  const todaySchedule = getScheduleForDay(day);
  
  if (!todaySchedule) return false;
  
  const openTimeInMinutes = convertTimeToMinutes(todaySchedule.open);
  const closeTimeInMinutes = convertTimeToMinutes(todaySchedule.close);
  
  return timeInMinutes >= openTimeInMinutes && timeInMinutes < closeTimeInMinutes;
}

function getNextOpeningTime() {
  const { dayIndex, timeInMinutes } = getCurrentTimeInfo();
  let currentDayIndex = dayIndex;
  let daysChecked = 0;

  while (daysChecked < DAYS.length) {
    const schedule = getScheduleForDay(DAYS[currentDayIndex]);
    
    if (schedule) {
      const openTimeInMinutes = convertTimeToMinutes(schedule.open);
      
      if (daysChecked === 0 && timeInMinutes < openTimeInMinutes) {
        return calculateHoursDifference(timeInMinutes, openTimeInMinutes);
      } else if (daysChecked > 0) {
        return daysChecked * HOURS_IN_DAY + calculateHoursDifference(timeInMinutes, openTimeInMinutes);
      }
    }
    
    currentDayIndex = (currentDayIndex + 1) % DAYS.length;
    daysChecked++;
  }
  return 0;
}

function getShopStatus() {
  const { day } = getCurrentTimeInfo();
  const todaySchedule = getScheduleForDay(day);
  
  if (isShopOpen()) {
    const { timeInMinutes } = getCurrentTimeInfo();
    const closeTimeInMinutes = convertTimeToMinutes(todaySchedule.close);
    const hoursUntilClosing = roundToDecimal(calculateHoursDifference(timeInMinutes, closeTimeInMinutes));
    return `Open, The shop will be closed within ${hoursUntilClosing} Hrs`;
  } else {
    const hoursUntilOpening = roundToDecimal(getNextOpeningTime());
    return `Closed. The shop will be open after ${hoursUntilOpening} Hrs`;
  }
}

// Display shop status
console.log(getShopStatus());