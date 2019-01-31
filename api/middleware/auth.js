const jwt = require('jsonwebtoken');
require('dotenv').config();

const Blacklist = require('../models/blacklist');
const { cError } = require('../util/helpers');

module.exports = (...allowed) => {
  if (allowed.length === 0) {
    allowed = ['user', 'manager', 'admin'];
  }
  const isAllowed = role => allowed.indexOf(role) > -1;

  return async (req, res, next) => {
    if (!req.get('Authorization')) {
      cError('Not authenticated.', 401);
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
      const blacklistedToken = await Blacklist.findOne({ token: token });

      if (blacklistedToken) {
        cError('Unvalid token.', 401);
      }

      decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

      if (!decodedToken || !isAllowed(decodedToken.role)) {
        cError('Not authenticated.', 401);
      }

      req.userId = decodedToken.userId;
      req.userEmail = decodedToken.email;
      req.userRole = decodedToken.role;
      req.userToken = token;

      next();
    } catch (error) {
      next(error);
    }
  };
};
