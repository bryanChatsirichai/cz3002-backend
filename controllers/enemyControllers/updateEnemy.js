require('dotenv').config();
const Enemy = require('../../service/enemyServices/updateEnemy');
const EnemyError = require('../../middlewear/customErrors/enemyError');
const { StatusCodes } = require('http-status-codes');

const updateEnemy = async (req, res, next) => {
  console.log('updating enemy');
  //console.log(req.body);
  const enemy_info = {
    userId: req.body.user._id,
  };
  //the spicific enemy to update the completion status
  //example syntax updateOne({ name: 'Annu' }, { $set: { age: 25 } });
  /*
      name: enemies[enemyIndex].name,
      currhp: enemies[enemyIndex].health,
      hp: enemies[enemyIndex].health,
      type: enemies[enemyIndex].type,
      xp: enemies[enemyIndex].xp,
      gold: enemies[enemyIndex].gold,
  */
  const newName = req.body.name;
  const newType = req.body.type;
  const newHp = req.body.hp;
  const newCurHp = req.body.currhp;
  const newGold = req.body.gold;
  const newXp = req.body.xp;
  const result = await Enemy.updateOne(enemy_info, {
    $set: { name: newName, type: newType, hp: newHp, currhp: newCurHp, gold: newGold, xp: newXp },
  });
  //console.log(result);
  if (result.modifiedCount == 0) {
    const enemyError = new EnemyError('No update was done', StatusCodes.BAD_REQUEST);
    console.log(enemyError);
    next(enemyError);
    return;
  }
  res.status(200);
  res.send(result);
  return;
};

module.exports = updateEnemy;
