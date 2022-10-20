//acess .env variables
require('dotenv').config();
const Profile = require('../../service/profileServices/createProfile');
const profileValidation = require('../../validation/profileValidation');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');

const createProfile = async (req, res, next) => {
  const profile_info = {
    userId: req.body.user._id,
    name: '',
    xp: 0,
    gold: 0,
  };
  //Validate before creatung usergit
  const validation_result = profileValidation(profile_info);

  //check if error object created
  const error = validation_result.error;
  if (error) {
    const profileError = new ProfileError(error.details[0].message, StatusCodes.BAD_REQUEST);
    next(profileError);
    return;
  }

  //create new profile
  // _id field automatically by mongo for the entry
  const profile = await new Profile(profile_info);
  try {
    const savedProfile = await profile.save();
    res.status(StatusCodes.CREATED);
    res.send({ success: true, message: 'Profile created' });
    return;
  } catch (error) {
    //fail to save to DB
    const profileError = new ProfileError(error.message, StatusCodes.BAD_REQUEST);
    next(profileError);
    return;
  }
};

module.exports = createProfile;
