const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

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
      data: {
        user: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Oops! Something went wrong.',
      errors: [error.toString()]
    });
  }
};

/**
 * POST /user/login
 * Logges user in. Returns logged in user?
 *
 * Permissions: *
 */
exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    const passMatch = await bcrypt.compare(password, user ? user.password : '');

    if (!user || !passMatch) {
      res
        .status(401)
        .set('WWW-Authentication', 'Basic realm="Logged out Realm"')
        .json({
          message: 'Incorrect e-mail and/or password.',
          errors: [
            {
              msg: 'Incorrect e-mail and/or password.'
            }
          ]
        });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'User successfully logged in.',
      data: {
        token: token,
        userId: user._id.toString()
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Oops! Something went wrong.',
      errors: [error.toString()]
    });
  }
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
