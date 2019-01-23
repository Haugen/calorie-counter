const User = require('../models/user');

/**
 * GET /admin/users
 * Returns all users.
 *
 * Permissions: manager, admin.
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      message: 'ADMIN all users.',
      data: {
        users: users
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /admin/meals
 * Returns all meals.
 *
 * Permissions: admin.
 */
exports.getMeals = (req, res) => {
  res.json({
    message: 'GET Admin all meals.'
  });
};
