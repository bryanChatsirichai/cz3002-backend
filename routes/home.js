const express = require('express');
const router = express.Router();

//TASK
const createTask = require('../controllers/taskControllers/createTaskController');
const deleteTask = require('../controllers/taskControllers/deleteTaskController');
const getTask = require('../controllers/taskControllers/getTaskController');
const updateTask = require('../controllers/taskControllers/updateTaskController');

//PROFILE
const getProfile = require('../controllers/profileControllers/getProfile');

//private route - middlerwear
const verify = require('./verifyToken');

// /home/task
//creating(post) a task and store in DB
router.route('/task').post(verify, createTask);

// /home/task
//get all tasks belonging to a user by userId
router.route('/task').get(verify, getTask);

// /home/task
//update specific task
router.route('/task/:id').patch(verify, updateTask);

// /home/task
//delete specific task
router.route('/task/:id').delete(verify, deleteTask);

// /home/profile
// get the profile
router.route('/profile').get(verify, getProfile);

module.exports = router;
