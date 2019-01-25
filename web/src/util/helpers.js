// Base URL for backend API.
module.exports.BASE_URL = 'http://localhost:3001';

// Convert date between local and UTC.
module.exports.convertDate = (date, direction) => {
  const inputDate = new Date(date);
  const offset = inputDate.getTimezoneOffset();
  let newDate;

  if (direction === 'utl') {
    newDate = Number(inputDate) + offset * 60 * 1000;
  } else if (direction === 'ltu') {
    newDate = Number(inputDate) - offset * 60 * 1000;
  }
  return newDate;
};

// Formatting dates for display.
module.exports.dateForDisplay = date => {
  let newDate = new Date(date).toLocaleString('en-GB', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  return newDate;
};

// Helper function to get total number of minutes based on time.
module.exports.timeNumber = date => {
  if (isNaN(date) || !date) return null;
  date = this.convertDate(date, 'ltu');
  const hours = new Date(Number(date)).getUTCHours();
  const minutes = new Date(Number(date)).getUTCMinutes();
  return hours * 60 + minutes;
};
