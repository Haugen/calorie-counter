const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (...allowed) => {
  if (allowed.length === 0) {
    allowed = ['user', 'manager', 'admin'];
  }
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    // If not Authorization-
    if (!req.get('Authorization')) {
      throw new Error('Not authenticated.');
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    // Try to decode the token.
    try {
      decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (error) {
      throw error;
    }

    // Would we ever escape the try/catch with decodedToken being falsy?
    if (!decodedToken) {
      throw new Error('Not authenticated.');
    }

    // Valid token! Last check, is the user role allowed to proceed?
    if (!isAllowed(decodedToken.role)) {
      throw new Error('Not authenticated.');
    }

    req.userId = decodedToken.userId;

    next();
  };
};
