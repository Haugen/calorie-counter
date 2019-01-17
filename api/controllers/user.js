const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

/**
 * POST /user/signup
 * Sign user up. Returns the email address used for signing up.
 *
 * Permissions: *
 */
exports.postSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: errors.array()
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashedPassword
    });
    user.save();

    res.status(201).json({
      message: 'User successfully created.',
      user: user.email
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /user/login
 * Logges user in. Returns logged in user?
 *
 * Permissions: *
 */
exports.postLogin = (req, res) => {
  res.json({
    message: 'POST User login.'
  });
};

/**
 * POST /user/delete
 * Deletes a user. Returns deleted user?
 *
 * Permissions: admin
 */
exports.postDelete = (req, res) => {
  res.json({
    message: 'POST Deletes user.'
  });
};

/**
 * PUT /user/edit/:id
 * Edits a user. Returnes the updated user?
 *
 * Permissions: user, manager, admin
 */
exports.putEdit = (req, res) => {
  res.json({
    message: 'PUT Edits user.'
  });
};
