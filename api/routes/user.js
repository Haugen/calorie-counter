const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const validators = require('../middleware/validator');
const auth = require('../middleware/auth');

router.post('/signup', validators.signup, userController.postSignup);
router.post('/login', userController.postLogin);
router.post('/delete/:id', auth('manager', 'admin'), userController.postDelete);

router.put('/edit/:id', auth(), userController.putEdit);

module.exports = router;
