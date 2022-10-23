require('dotenv').config();
const Enemy = require('../../service/enemyServices/updateEnemy');
const EnemyError = require('../../middlewear/customErrors/enemyError');
const { StatusCodes } = require('http-status-codes');

const createEnemy = async (req, res, next) => {
  const enemy_info = {
    userId: req.body.user._id,
    type: '',
    name: '',
    health: 0,
    xp: 0,
    gold: 0,
  };
  //create new enemy
  const enemy = await new Enemy(enemy_info);
  try {
    const savedEnemy = await enemy.save();
    res.status(StatusCodes.CREATED);
    res.send({ success: true, message: 'Enemy created' });
    return;
  } catch (error) {
    //fail to save to DB
    const enemyError = new EnemyError(error.message, StatusCodes.BAD_REQUEST);
    next(enemyError);
    return;
  }
};
module.exports = createEnemy;
