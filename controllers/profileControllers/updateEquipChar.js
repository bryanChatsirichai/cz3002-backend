//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/updateProfile');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');
const updateEquipChar = async (req, res, next) => {
    console.log('updating profile');
    const profile_info = {
      userId: req.body.user._id,
    };
    //the spicific profile to update the completion status
    //example syntax updateOne({ name: 'Annu' }, { $set: { age: 25 } });
    const newChar_equipped = req.body.char_equipped;
    //console.log(newGold, newXp);
    const result = await Profile.updateOne(profile_info, { $set: { char_equipped: newChar_equipped } });
    //console.log(result);
    if (result.modifiedCount == 0) {
      const profileError = new ProfileError('No update was done', StatusCodes.BAD_REQUEST);
      console.log(profileError);
      next(profileError);
      return;
    }
  res.status(200);
   res.send(result);
    return;
};

module.exports = updateEquipChar;
