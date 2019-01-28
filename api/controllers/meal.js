const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const Meal = require('../models/meal');
const User = require('../models/user');
const { cError, timeNumber } = require('../util/helpers');

/**
 * GET /meals
 * Returns all meals for logged in user.
 *
 * Permissions: user, manager, admin.
 */
exports.getMeals = async (req, res, next) => {
  const fromDate = req.query.fromDate || new Date('2019-01-01').getTime();
  let toDate = req.query.toDate || new Date().getTime();
  const fromTime = timeNumber(req.query.fromTime) || 0;
  const toTime = timeNumber(req.query.toTime) || 1440;
  const almostADay = 1000 * 60 * 60 * 24 - 1000;
  toDate = Number(toDate) + almostADay;

  try {
    const mealQuery = Meal.aggregate([
      {
        $match: {
          $and: [
            { user: mongoose.Types.ObjectId(req.userId) },
            { date: { $gte: new Date(+fromDate) } },
            { date: { $lte: new Date(+toDate) } }
          ]
        }
      },
      {
        $project: {
          aggDate: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          text: 1,
          calories: 1,
          date: 1,
          time: 1
        }
      },
      {
        $group: {
          _id: '$aggDate',
          dayMeals: { $push: '$$ROOT' },
          dayTotalCalories: { $sum: '$calories' }
        }
      }
    ]);
    mealQuery.sort({ date: 'desc' });

    const meals = await mealQuery;

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
    const meal = await Meal.findOne({ _id: mealId }).populate('user');

    if (!meal) {
      cError('Meal not found', 404);
    }

    if (meal.user.toString() !== req.userId && req.userRole !== 'admin') {
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
    time: time
  };

  try {
    if (req.userRole === 'admin') {
      const userEmail = req.body.userEmail;
      if (userEmail && userEmail !== 'Myself') {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
          cError("User not found. Can't assign meal.", 404);
        } else {
          mealData.user = user._id;
        }
      }
    }

    if (!mealData.user) mealData.user = req.userId;

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

    if (meal.user.toString() !== req.userId && req.userRole !== 'admin') {
      cError('Not authenticated', 401);
    }

    if (req.userRole === 'admin') {
      const userEmail = req.body.userEmail;
      if (userEmail && userEmail !== 'Myself') {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
          cError("User not found. Can't assign meal.", 404);
        } else {
          meal.user = user._id;
        }
      } else {
        meal.user = req.userId;
      }
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

    if (meal.user.toString() !== req.userId && req.userRole !== 'admin') {
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
