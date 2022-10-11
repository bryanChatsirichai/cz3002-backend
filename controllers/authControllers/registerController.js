//acess .env variables
require('dotenv').config();
const User = require('../../service/authServices/registerUser');
const Message = require('../../service/messageServices/createMessage');
const userRegisterValidation = require('../../validation/userValidation');
const RegisterError = require('../../middlewear/customErros/registerError');
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
    const registerError = new RegisterError('Email already exist');
    next(registerError, StatusCodes.NOT_ACCEPTABLE);
    return;
  }

  //Hash password
  const hashedPassword = await hashPassword(user_info.password);

  //update user_info
  user_info.password = hashedPassword;

  //create new user
  // _id field automatically by mongo for the entry
  const user = new User(user_info);

  //Gerate a welcome message to the message box upon Creating account
  const welcomeMessage = new Message({
    userId: user._id,
    detail: 'Thank you for Signing up',
  });

  try {
    const savedUser = await user.save();
    const savedWelcomeMessage = await welcomeMessage.save();
    //res.send({ user: savedUser._id });
    res.status(201);
    res.send({ success: true, message: 'User created' });
    return;
  } catch (error) {
    const registerError = new RegisterError(error.messag, StatusCodes.BAD_REQUEST);
    //fail to save to DB
    next(registerError);
    return;
  }
};

module.exports = { register_user };
