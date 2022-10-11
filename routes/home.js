const express = require('express');
const router = express.Router();
const createTask = require('../controllers/taskControllers/createTaskController');
const getTask = require('../controllers/taskControllers/getTaskController');
const updateTask = require('../controllers/taskControllers/updateTaskController');
//private route - middlerwear
const verify = require('./verifyToken');

// /home/task
//creating(post) a task and store in DB
router.route('/task').post(verify, createTask);

// /home/task
//get all tasks belonging to a user by userId
router.route('/task').get(verify, getTask);

// /home/tasl
//update specific task
router.route('/task').patch(verify, updateTask);
module.exports = router;
