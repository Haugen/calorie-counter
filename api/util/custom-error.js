// Helper function for throwing custom errors.
module.exports = (message, code) => {
  const error = new Error(message);
  error.statusCode = code || 500;
  throw error;
};
