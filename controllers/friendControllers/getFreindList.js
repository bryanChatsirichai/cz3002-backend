//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/getProfile');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');
const getFriendList = async (req, res, next) => {
  //console.log('get friendList');
  const profile_info = {
    userId: req.body.user._id,
  };
  try {
    const result = await Profile.find(profile_info);
    const profile = result[0];
    const freinds = profile.friends;
    //console.log(freinds);
    res.status(StatusCodes.OK);
    res.send(freinds);
  } catch (error) {
    const profileError = new ProfileError('Error Retriving user profile', StatusCodes.BAD_REQUEST);
    next(profileError);
  }
};

module.exports = getFriendList;
