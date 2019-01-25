// Helper function for throwing custom errors.
module.exports.cError = (message, code) => {
  const error = new Error(message);
  error.statusCode = code || 500;
  throw error;
};

// Helper function to get total number of minutes based on time.
module.exports.timeNumber = date => {
  if (isNaN(date) || !date) return null;
  const hours = new Date(Number(date)).getUTCHours();
  const minutes = new Date(Number(date)).getUTCMinutes();
  return hours * 60 + minutes;
};
