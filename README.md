# Shop Status Checker

This program determines the current status of a shop based on its schedule. It provides information about whether the shop is open or closed and, if closed, when it will open next.

## Features

The program is implemented in three phases:

### Phase 1
- Outputs whether the shop is **Open** or **Closed**.

### Phase 2
- If the shop is **Open**, it displays the time remaining until it closes.
- If the shop is **Closed**, it displays the time remaining until it opens (in hours).

### Phase 3
- If the shop is **Closed**, it provides:
  - Time in **hours** if the next opening time is within the same day.
  - Time in **days and hours** if the next opening time is more than a day away.

## Shop Schedule Configuration

The shop schedule is defined as a JSON object. Below is an example configuration:

```javascript
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
```

## Example Outputs

### Phase 1
- **If the shop is open**:  
  `Open`
- **If the shop is closed**:  
  `Closed`

### Phase 2
- **If the shop is open**:  
  `Open, The shop will be closed within <XYZ> Hrs`
- **If the shop is closed**:  
  `Closed. The shop will be open after <XYZ> Hrs`

### Phase 3
- **If the shop is open**:  
  `Open, The shop will be closed within <XYZ> Hrs`
- **If the shop is closed and the next opening time is less than a day**:  
  `Shop is Currently Closed. and it will be open after <XYZ> Hrs`
- **If the shop is closed and the next opening time is more than a day**:  
  `Shop is Currently Closed. and it will be open after <X> (Day/Days) and <XYZ> Hrs`

## How to Run

1. Clone the repository and navigate to the project directory.
2. Ensure Node.js is installed on your system.
3. Run the script using the following command:
   ```bash
   node shop.js
   ```
4. The output will display the current shop status.

## Branching Strategy

The code is developed in three separate branches:
- **Phase 1**: Basic functionality to check if the shop is open or closed.
- **Phase 2**: Adds the time until the shop opens or closes.
- **Phase 3**: Enhances the output to include days and hours if the next opening time is more than a day away.