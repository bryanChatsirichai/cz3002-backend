const express = require("express");
const router = express.Router();
const {
  createTask,
} = require("../controllers/taskControllers/createTaskController");
//private route - middlerwear
const verify = require("./verifyToken");

// /home/task
//creating(post) a task and store in DB
router.route("/task").post(verify, createTask);

module.exports = router;
