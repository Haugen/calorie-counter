const { validationResult } = require('express-validator/check');

const Meal = require('../models/meal');

/**
 * GET /meals
 * Returns all meals for logged in user.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeals = (req, res) => {
  res.json({
    message: 'GET All user meals.'
  });
};

/**
 * GET /meal/:id
 * Returns a single meal based on ID. If user, only return own meals.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeal = (req, res) => {
  res.json({
    message: 'GET Single meal based on req id.'
  });
};

/**
 * POST /meals
 * Returns the created meal.
 *
 * Permissions: user, manager, admin.
 */
exports.postMeal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: errors.array()
    });
  }

  const mealData = {
    text: req.body.text,
    calories: req.body.calories,
    user: req.userId
  };

  try {
    const newMeal = await Meal.create(mealData);

    res.json({
      message: 'Meal created.',
      data: {
        meal: newMeal
      }
    });
  } catch (error) {
    throw error;
  }
};

/**
 * PUT /meals/:id
 * Returns the updated meal.
 *
 * Permissions: user, manager, admin.
 */
exports.putMeal = (req, res) => {
  res.json({
    message: 'PUT Edit meal.'
  });
};

/**
 * DELETE /meals/:id
 * Returns the deleted meal? Or just a success message?
 *
 * Permissions: user, manager, admin.
 */
exports.deleteMeal = (req, res) => {
  res.json({
    message: 'DELETE Meal.'
  });
};
