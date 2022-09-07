const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

//register route
router.route("/").post(registerController.register_user);

module.exports = router;
