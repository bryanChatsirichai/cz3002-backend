//acess .env variables
require('dotenv').config();
const Task = require('../../service/taskServices/updateTask');
const TaskError = require('../../middlewear/customErrors/taskError');
const { StatusCodes } = require('http-status-codes');
const updateTask = async (req, res, next) => {
  //console.log(req.body);
  //update the completed status
  //console.log(req.params['id']);
  const task_info = {
    userId: req.body.user._id,
    id: req.params['id'],
  };

  //the spicific task to update the completion status
  //example syntax updateOne({ name: 'Annu' }, { $set: { age: 25 } });
  newCompleteStatus = req.body.completed;
  const result = await Task.updateOne(task_info, { $set: { completed: newCompleteStatus } });
  //console.log(result);
  if (result.modifiedCount == 0) {
    const taskError = new TaskError('No update was done', StatusCodes.BAD_REQUEST);
    next(taskError);
    return;
  }
  res.status(200);
  res.send(result);
  return;
};

module.exports = updateTask;
