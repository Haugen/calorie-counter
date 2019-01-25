const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { cError } = require('../util/helpers');

/**
 * POST /user/auth
 * Path for checking agaisn user permissions in previous middleware.
 * Returns user id and role.
 *
 * Permissions: manager, admin
 */
exports.authUser = async (req, res) => {
  res.status(200).json({
    message: 'User authenticated',
    data: {
      userId: req.userId,
      role: req.userRole
    }
  });
};

/**
 * GET /user/:id
 * Gets information about a single user.
 *
 * Permissions: manager, admin
 */
exports.getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      cError('User not found', 404);
    }

    if (
      user._id.toString() !== req.userId &&
      req.userRole !== 'admin' &&
      req.userRole !== 'manager'
    ) {
      cError('Not authenticated', 401);
    }

    res.status(200).json({
      message: 'User data',
      data: {
        userId: user._id,
        email: user.email,
        calories: user.dailyCalories
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /user/signup
 * Sign user up. Returns the email address used for signing up.
 *
 * Permissions: *
 */
exports.postSignup = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * POST /user/login
 * Logges user in. Returns logged in user?
 *
 * Permissions: *
 */
exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    const passMatch = await bcrypt.compare(password, user ? user.password : '');

    if (!user || !passMatch) {
      return res
        .status(401)
        .set('WWW-Authentication', 'Basic realm="Logged out Realm"')
        .json({
          message: 'Incorrect e-mail and/or password.'
        });
    }

    const token = jwt.sign(
      {
        role: user.role,
        userId: user._id.toString()
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'User successfully logged in.',
      data: {
        token: token,
        userId: user._id.toString(),
        userRole: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /user/:id
 * Deletes a user. Returns deleted user?
 *
 * Permissions: admin
 */
exports.deleteUser = (req, res) => {
  res.json({
    message: 'DELETE Deletes user.'
  });
};

/**
 * PUT /user/edit/:id
 * Edits a user. Returnes the updated user?
 *
 * Permissions: user, manager, admin
 */
exports.putEdit = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: errors.array()
    });
  }

  const userId = req.params.id;
  const calories = req.body.calories;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      cError('Meal not found', 404);
    }

    if (
      user._id.toString() !== req.userId &&
      req.userRole !== 'admin' &&
      req.userRole !== 'manager'
    ) {
      cError('Not authenticated', 401);
    }

    user.dailyCalories = calories;
    await user.save();

    res.status(200).json({
      message: 'User updated',
      data: {
        userId: user._id,
        email: user.email,
        calories: user.dailyCalories
      }
    });
  } catch (error) {
    next(error);
  }
};
