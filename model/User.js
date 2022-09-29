const mongoose = require("mongoose");
const formateDate = require("../service/utils/formateDate");
//Schema of user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    default: formateDate(new Date()),
  },
});

UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
