//acess .env variables
require("dotenv").config();
const Task = require("../../service/taskServices/getTask");
const getTask = async (req, res, next) => {
  //get all task base related to userId
  const task_info = {
    userId: req.body.user._id,
  };
  const result = await Task.find({ task_info });
  res.status(200);
  res.send(result);
};

module.exports = getTask;
