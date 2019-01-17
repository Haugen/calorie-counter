const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.post('/delete/:id', userController.postDelete);

router.put('/edit/:id', userController.putEdit);

module.exports = router;
