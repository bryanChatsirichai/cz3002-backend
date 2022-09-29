const mongoose = require("mongoose");
const formateDate = require("../service/utils/formateDate");
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
    type: String,
    default: formateDate(new Date()),
  },
});

TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
