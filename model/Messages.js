const mongoose = require("mongoose");
const formateDate = require("../service/utils/formateDate");
//Schema of Message
const MessageSchema = new mongoose.Schema({
  //tie each Message to user-id
  userId: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: formateDate(new Date()),
  },
});

MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
