//acess .env variables
require('dotenv').config();
const Task = require('../../service/taskServices/deleteTask');
const TaskError = require('../../middlewear/customErrors/taskError');
const { StatusCodes } = require('http-status-codes');
const deleteTask = async (req, res, next) => {
  //update the completed status
  const task_info = {
    userId: req.body.user._id,
    taskId: req.body.taskId,
  };
  try {
    const result = await Task.deleteOne(task_info);
    //console.log(result);
    res.status(StatusCodes.OK);
    res.send(result);
  } catch (error) {
    const taskError = new TaskError('Error Removing from Database', StatusCodes.BAD_REQUEST);
    next(taskError);
    return;
  }
};

module.exports = deleteTask;
