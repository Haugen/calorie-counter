const jwt = require('jsonwebtoken');
require('dotenv').config();

const { cError } = require('../util/helpers');

module.exports = (...allowed) => {
  if (allowed.length === 0) {
    allowed = ['user', 'manager', 'admin'];
  }
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    // If there is no Authorization header.
    if (!req.get('Authorization')) {
      cError('Not authenticated.', 401);
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    // Try to decode the token.
    try {
      decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (error) {
      throw error;
    }

    // Checking again for token, and lastly checking user role permissions.
    if (!decodedToken || !isAllowed(decodedToken.role)) {
      cError('Not authenticated.', 401);
    }

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;

    next();
  };
};
