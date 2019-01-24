const User = require('../models/user');
const Meal = require('../models/meal');

/**
 * GET /admin/users
 * Returns all users.
 *
 * Permissions: manager, admin.
 */
exports.getUsers = async (req, res, next) => {
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
exports.getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().populate('user');

    res.json({
      message: 'ADMIN all meals.',
      data: {
        meals: meals
      }
    });
  } catch (error) {
    next(error);
  }
};
