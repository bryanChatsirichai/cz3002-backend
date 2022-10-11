//acess .env variables
require('dotenv').config();
const Task = require('../../service/taskServices/getTask');
const { sortByCreatedAtDescending, sortByCreatedAtAscending } = require('../../service/utils/sortBy');
const TaskError = require('../../middlewear/customErrors/taskError');
const { StatusCodes } = require('http-status-codes');
const getTask = async (req, res, next) => {
  //get all task base related to userId
  const task_info = {
    userId: req.body.user._id,
  };
  try {
    const result = await Task.find(task_info);
    result.sort(sortByCreatedAtAscending);
    //console.log(result);
    res.status(200);
    res.send(result);
  } catch (error) {
    const taskError = new TaskError("Error Retriving all tasks", StatusCodes.BAD_REQUEST);
    next(taskError);
  }
};

module.exports = getTask;
