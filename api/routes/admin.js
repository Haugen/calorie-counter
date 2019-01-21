const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const auth = require('../middleware/auth');

router.get('/users', auth('manager', 'admin'), adminController.getUsers);
router.get('/meals', auth('admin'), adminController.getMeals);

module.exports = router;
