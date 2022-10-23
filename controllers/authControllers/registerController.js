//acess .env variables
require('dotenv').config();
//services
const User = require('../../service/authServices/registerUser');
const Message = require('../../service/messageServices/createMessage');
const Profile = require('../../service/profileServices/createProfile');
const Enemy = require('../../service/enemyServices/createEnemy');
//validation
const verify = require('../../routes/verifyToken');
const userRegisterValidation = require('../../validation/userValidation');
const RegisterError = require('../../middlewear/customErrors/registerError');
const { hashPassword } = require('../../service/authServices/bcryptPassowrd');
const { StatusCodes } = require('http-status-codes');
const register_user = async (req, res, next) => {
  //extract user info from req.body
  const user_info = {
    name: req.body.name,
    region: req.body.region,
    email: req.body.email,
    password: req.body.password,
  };

  //Validate before creatung user
  const validation_result = userRegisterValidation(user_info);

  //check if error object created
  const error = validation_result.error;
  if (error) {
    const registerError = new RegisterError(error.details[0].message, StatusCodes.BAD_REQUEST);
    next(registerError);
    return;
  }

  //checking if user already in DB by email
  const userExist = await User.findOne({ email: user_info.email });
  if (userExist) {
    const registerError = new RegisterError('Email already exist', StatusCodes.NOT_ACCEPTABLE);
    next(registerError);
    return;
  }

  //Hash password
  const hashedPassword = await hashPassword(user_info.password);

  //update user_info
  user_info.password = hashedPassword;

  //create new user
  // _id field automatically by mongo for the entry
  const user = new User(user_info);

  //Generate a welcome message to the message box upon Creating account
  const welcomeMessage = new Message({
    userId: user._id,
    detail: 'Thank you for Signing up',
  });

  //Generate Profile tie to user upon Creating account
  const profile = new Profile({
    userId: user._id,
    name: user.name,
    xp: 0,
    gold: 0,
  });
  const enemy = new Enemy({
    userId: user._id,
    type: 'dark_mage',
    name: '',
    hp: 0,
    currhp: 0,
    xp: 0,
    gold: 0,
  });
  try {
    const savedUser = await user.save();
    const savedWelcomeMessage = await welcomeMessage.save();
    const savedProfile = await profile.save();
    const savedEnemy = await enemy.save();
    //res.send({ user: savedUser._id });
    //res.status(StatusCodes.CREATED);
    //send back auth_token
    //res.send({ success: true, message: user._id });
    //return;
    //afterter register do login hiddenly
    next();
  } catch (error) {
    const registerError = new RegisterError(error.message, StatusCodes.BAD_REQUEST);
    //fail to save to DB
    next(registerError);
    return;
  }
};

module.exports = { register_user };
