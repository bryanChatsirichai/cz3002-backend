//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/getProfile');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');
const getProfile = async (req, res, next) => {
  //get profile related to userId
  const profile_info = {
    userId: req.body.user._id,
  };
  try {
    const result = await Profile.find(profile_info);
    res.status(StatusCodes.OK);
    res.send(result);
  } catch (error) {
    const profileError = new Profile('Error Retriving user profile', StatusCodes.BAD_REQUEST);
    next(profileError);
  }
};

module.exports = getProfile;
