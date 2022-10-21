//Buying is just adding string the profile char_bought array
//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/updateProfile');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');
const buyChar = async (req, res, next) => {
  console.log('updating profile char_bought');
  const profile_info = {
    userId: req.body.user._id,
  };
  //the spicific profile to update the completion status
  //example syntax updateOne({ name: 'Annu' }, { $set: { age: 25 } });

  //asuming receving new array for now
  const newChar_bought = req.body.char_bought;
  const result = await Profile.updateOne(profile_info, { $set: { char_bought: newChar_bought } });
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

module.exports = buyChar;
