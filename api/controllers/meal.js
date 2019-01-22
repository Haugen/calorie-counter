const { validationResult } = require('express-validator/check');

const Meal = require('../models/meal');
const cError = require('../util/custom-error');

/**
 * GET /meals
 * Returns all meals for logged in user.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeals = async (req, res) => {
  const meals = await Meal.find({ user: req.userId });

  res.json({
    data: {
      meals: meals
    }
  });
};

/**
 * GET /meal/:id
 * Returns a single meal based on ID. If user, only return own meals.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeal = async (req, res, next) => {
  const mealId = req.params.id;

  try {
    const meal = await Meal.findOne({ _id: mealId });

    if (!meal) {
      cError('Meal not found', 404);
    }

    if (meal.user.toString() !== req.userId) {
      cError('Not authenticated', 401);
    }

    res.status(200).json({
      data: {
        meal: meal
      }
    });
  } catch (error) {
    next(error);
  }
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
    next(error);
  }
};

/**
 * PUT /meals/:id
 * Returns the updated meal.
 *
 * Permissions: user, manager, admin.
 */
exports.putMeal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: errors.array()
    });
  }

  const mealId = req.params.id;
  const text = req.body.text;
  const calories = req.body.calories;

  try {
    const meal = await Meal.findOne({ _id: mealId });

    if (!meal) {
      cError('Meal not found', 404);
    }

    if (meal.user.toString() !== req.userId) {
      cError('Not authenticated', 401);
    }

    meal.text = text;
    meal.calories = calories;
    await meal.save();

    res.status(200).json({
      message: 'Meal updated',
      data: {
        meal: meal
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /meals/:id
 * Returns the deleted meal? Or just a success message?
 *
 * Permissions: user, manager, admin.
 */
exports.deleteMeal = async (req, res) => {
  const mealId = req.params.id;

  try {
    const meal = await Meal.findOne({ _id: mealId });

    if (!meal) {
      cError('Meal not found', 404);
    }

    if (meal.user.toString() !== req.userId) {
      cError('Not authenticated', 401);
    }

    // If meal found and authroized to delete.
    const deletedMeal = await Meal.deleteOne({ _id: mealId });

    res.status(200).json({
      message: 'Meal deleted',
      data: {
        deletedMeal: deletedMeal,
        deleteMealId: mealId
      }
    });
  } catch (error) {
    next(error);
  }
};
