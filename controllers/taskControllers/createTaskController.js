//acess .env variables
require("dotenv").config();
const Task = require("../../service/taskServices/createTask");
const createTask = async (req, res, next) => {
  const task_info = {
    userId: req.body.userId,
    detail: req.body.detail,
  };
  //create new task
  // _id field automatically by mongo for the entry
  const task = await new Task(task_info);
  try {
    const savedTask = await task.save();
    res.status(201);
    res.send({ success: true, message: "Task created" });
    return;
  } catch (error) {
    //fail to save to DB
    res.status(400);
    res.send(error);
    return;
  }
};

module.exports = { createTask };
