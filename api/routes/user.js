const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const validators = require('../middleware/validator');
const auth = require('../middleware/auth');

router.get('/auth', auth(), userController.authUser);
router.get('/:id', auth(), userController.getUser);

router.post('/signup', validators.signup, userController.postSignup);
router.post('/login', userController.postLogin);

router.put('/edit/:id', auth(), validators.editUser, userController.putEdit);

router.delete('/:id', auth('manager', 'admin'), userController.deleteUser);

module.exports = router;
