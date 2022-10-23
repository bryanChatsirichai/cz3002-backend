//acess .env variables
require('dotenv').config();
const Enemy = require('../../service/enemyServices/getEnemy');
const EnemyError = require('../../middlewear/customErrors/enemyError');
const { StatusCodes } = require('http-status-codes');
const getEnemy = async (req, res, next) => {
  //get enemy related to userId
  const enemy_info = {
    userId: req.body.user._id,
  };
  try {
    const result = await Enemy.find(enemy_info);
    res.status(StatusCodes.OK);
    res.send(result);
  } catch (error) {
    const enemyError = new EnemyError('Error Retriving enemy profile', StatusCodes.BAD_REQUEST);
    next(enemyError);
  }
};

module.exports = getEnemy;
