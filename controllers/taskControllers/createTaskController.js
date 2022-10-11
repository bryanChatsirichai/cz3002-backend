//acess .env variables
require('dotenv').config();
const Task = require('../../service/taskServices/createTask');
const taskValidation = require('../../validation/taskValidation');
const TaskError = require('../../middlewear/customErrors/taskError');
const { StatusCodes } = require('http-status-codes');

const createTask = async (req, res, next) => {
  const task_info = {
    userId: req.body.user._id,
    detail: req.body.detail,
    taskId: req.body.taskId,
    priority: req.body.priority,
  };
  //Validate before creatung usergit 
  const validation_result = taskValidation(task_info);

  //check if error object created
  const error = validation_result.error;
  if (error) {
    const taskError = new TaskError(error.details[0].message, StatusCodes.BAD_REQUEST);
    next(taskError);
    return;
  }

  //create new task
  // _id field automatically by mongo for the entry
  const task = await new Task(task_info);
  try {
    const savedTask = await task.save();
    //console.log('savedTask', savedTask);
    res.status(201);
    res.send({ success: true, message: 'Task created' });
    return;
  } catch (error) {
    //fail to save to DB
    const taskError = new TaskError(error.message, StatusCodes.BAD_REQUEST);
    next(taskError);
    return;
  }
};

module.exports = createTask;
