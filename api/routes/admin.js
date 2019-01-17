const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/users', adminController.getUsers);
router.get('/meals', adminController.getMeals);

module.exports = router;
