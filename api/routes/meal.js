const express = require('express');

const router = express.Router();

const mealController = require('../controllers/meal');
const validators = require('../middleware/validator');
const auth = require('../middleware/auth');

router.get('/meals', auth(), mealController.getMeals);
router.get('/meals/:id', auth(), mealController.getMeal);

router.post('/meals', auth(), validators.addMeal, mealController.postMeal);

router.put('/meals/:id', auth(), mealController.putMeal);

router.delete('/meals/:id', auth(), mealController.deleteMeal);

module.exports = router;
