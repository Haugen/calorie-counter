const express = require('express');

const router = express.Router();

const mealController = require('../controllers/meal');

router.get('/meals', mealController.getMeals);
router.get('/meals/:id', mealController.getMeal);

router.post('/meals', mealController.postMeal);

router.put('/meals/:id', mealController.putMeal);

router.delete('/meals/:id', mealController.deleteMeal);

module.exports = router;
