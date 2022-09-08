var express = require("express");
var router = express.Router();
const registerController = require("../controllers/registerController");
const signInController = require("../controllers/signInController");
// /user/register
router.route("/register").post(registerController.register_user);

// /user/login
router.route("/signin").post(signInController.signIn_user);

module.exports = router;
