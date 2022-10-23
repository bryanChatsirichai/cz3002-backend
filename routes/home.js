const express = require('express');
const router = express.Router();

//TASK
const createTask = require('../controllers/taskControllers/createTaskController');
const deleteTask = require('../controllers/taskControllers/deleteTaskController');
const getTask = require('../controllers/taskControllers/getTaskController');
const updateTask = require('../controllers/taskControllers/updateTaskController');

//PROFILE
const getProfile = require('../controllers/profileControllers/getProfile');
const updateProfile = require('../controllers/profileControllers/updateProfile');
const updateEquipChar = require('../controllers/profileControllers/updateEquipChar');

//SHOP
const buyChar = require('../controllers/shopController/buyChar');

//ENEMY
const getEnemy = require('../controllers/enemyControllers/getEnemy');
const updateEnemy = require('../controllers/enemyControllers/updateEnemy');
const damageEnemy = require('../controllers/enemyControllers/damageEnemy');

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

// /home/profile
// update the profile
router.route('/profile').patch(verify, updateProfile);

//home/profile/equipChar
// update char_equip
router.route('/profile/equipChar').patch(verify, updateEquipChar);

// /home/shop/characters
//buy character from shop
router.route('/shop/characters').patch(verify, buyChar);

// /home/enemy

//get enemy
router.route('/enemy').get(verify, getEnemy);

//update/set enemy
router.route('/enemy/update').patch(verify, updateEnemy);

//damage enemy
router.route('/enemy/damage').patch(verify, damageEnemy);
module.exports = router;
