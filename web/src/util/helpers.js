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
