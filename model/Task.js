const mongoose = require("mongoose");

//Schema of task
const TaskSchema = new mongoose.Schema({
  //tie each task to user-id
  userId: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
