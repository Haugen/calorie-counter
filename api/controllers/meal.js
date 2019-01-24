const { validationResult } = require('express-validator/check');

const Meal = require('../models/meal');
const { cError, timeNumber } = require('../util/helpers');

/**
 * GET /meals
 * Returns all meals for logged in user.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeals = async (req, res, next) => {
  const fromDate = req.query.fromDate;
  let toDate = req.query.toDate;
  const fromTime = timeNumber(req.query.fromTime);
  const toTime = timeNumber(req.query.toTime);
  // To add one second less than 24 hours to date query.
  const almostADay = 1000 * 60 * 60 * 24 - 1000;
  toDate = Number(toDate) + almostADay;

  const query = Meal.find({ user: req.userId });

  if (fromDate) {
    query.where({ date: { $gte: fromDate } });
  }
  if (toDate) {
    query.where({ date: { $lte: toDate } });
  }
  if (fromTime) {
    query.where({ time: { $gte: fromTime } });
  }
  if (toTime) {
    query.where({ time: { $lte: toTime } });
  }

  query.sort({ date: 'desc' });

  try {
    const meals = await query;

    res.json({
      data: {
        meals: meals
      }
    });
  } catch (error) {
    next(error);
  }
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

  const date = req.body.date;
  const time = timeNumber(date);

  const mealData = {
    text: req.body.text,
    calories: req.body.calories,
    date: req.body.date,
    time: time,
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
  const date = req.body.date;
  const time = timeNumber(date);

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
    meal.date = date;
    meal.time = time;
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
exports.deleteMeal = async (req, res, next) => {
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
