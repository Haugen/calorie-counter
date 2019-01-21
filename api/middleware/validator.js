const { check } = require('express-validator/check');

const User = require('../models/user');

const validators = {};

validators.signup = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid e-mail address')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-mail address already exist.');
        }
      });
    })
    .normalizeEmail(),
  check('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please enter a password longer than 5 characters.')
];

validators.addMeal = [
  check('text')
    .not()
    .isEmpty()
    .withMessage('Please include som text.')
    .isLength({ max: 300 })
    .withMessage('Text too long. Maximum 300 characters.'),
  check('calories')
    .isNumeric({ no_symbols: true })
    .withMessage('Calories need to be a number.')
];

module.exports = validators;
