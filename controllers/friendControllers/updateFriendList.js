//Buying is just adding string the profile char_bought array
//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/updateProfile');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');
const updateFriendList = async (req, res, next) => {
  console.log('updating FriendList');
  const profile_info = {
    userId: req.body.user._id,
  };
  //the spicific profile to update the completion status
  //example syntax updateOne({ name: 'Annu' }, { $set: { age: 25 } });

  //asuming receving new array for now
  const newFriend_List = req.body.friends;
  const result = await Profile.updateOne(profile_info, { $set: { friends: newFriend_List } });
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

module.exports = updateFriendList;
