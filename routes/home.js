const express = require("express");
const router = express.Router();
const createTask = require("../controllers/taskControllers/createTaskController");
const getTask = require("../controllers/taskControllers/getTaskController");
//private route - middlerwear
const verify = require("./verifyToken");

// /home/task
//creating(post) a task and store in DB
router.route("/task").post(verify, createTask);

// /home/task
//get all tasks belonging to a user by userId
router.route("/task").get(verify, getTask);

module.exports = router;
