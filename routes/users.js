var express = require('express');
var router = express.Router();
const registerController = require("../controllers/registerController");

// /user/register
router.route("/register").post(registerController.register_user);

// /user/login

module.exports = router;
