const mongoose = require('mongoose');
const { curFormateDate } = require('../service/utils/formateDate');
//Schema of Enemy
const EnemySchema = new mongoose.Schema({
  //tie each Enemy to user-id
  /*
    type: 'tree_man',
    name: 'Tree Man',
    health: 120,
    xp: 150,
    gold: 200,
   */
  userId: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    //required: true,
  },
  name: {
    type: String,
    //required: true,
  },
  hp: {
    type: Number,
    //required: true,
  },
  currhp: {
    type: Number,
    //required: true,
  },
  xp: {
    type: Number,
    //required: true,
  },
  gold: {
    type: Number,
    //required: true,
  },
  //   createdAt: {
  //     type: String,
  //     default: curFormateDate,
  //   },
});

EnemyModel = mongoose.model('Enemy', EnemySchema);
module.exports = EnemyModel;
