const express = require('express');
const router = express.Router();
const registerController = require('../controllers/authControllers/registerController');
const loginController = require('../controllers/authControllers/logInController');
const postController = require('../controllers/authControllers/postController');

//private route - middlerwear
const verify = require('./verifyToken');

// /user/register
router.route('/register').post(registerController.register_user, loginController.login_user);

// /user/login
router.route('/login').post(loginController.login_user);

//testing to be remove later
router.route('/post').get(verify, postController);

module.exports = router;
