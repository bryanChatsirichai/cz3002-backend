const mongoose = require('mongoose');
const { curFormateDate } = require('../service/utils/formateDate');
//Schema of Message
const ProfileSchema = new mongoose.Schema({
  //tie each Profile to user-id
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  gold: {
    type: Number,
    required: true,
  },
  char_bought: {
    type: Array,
    default: [],
  },
  //   createdAt: {
  //     type: String,
  //     default: curFormateDate,
  //   },
});

ProfileModel = mongoose.model('Profile', ProfileSchema);
module.exports = ProfileModel;
