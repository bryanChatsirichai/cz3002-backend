const mongoose = require("mongoose");

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
    type: Date,
    default: Date.now,
  },
});

UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
