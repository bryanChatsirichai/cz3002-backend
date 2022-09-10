var express = require("express");
var router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/logInController");
const postController = require("../controllers/postController");

//private route - middlerwear
const verify = require("./verifyToken");

// /user/register
router.route("/register").post(registerController.register_user);

// /user/login
router.route("/login").post(loginController.login_user);

//testing to be remove later
//router.route("/post").post(loginController.login_user);
router.route("/post").get(verify, postController);
// router.route("/post").post((req, res, next) => {
//   console.log(req.body);
//   res.send(req.body);
// });
module.exports = router;
