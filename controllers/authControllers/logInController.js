//access .env variables
require('dotenv').config();
const User = require('../../service/authServices/loginUser');
const userLoginValidation = require('../../validation/loginValidation');
const { validatePassword } = require('../../service/authServices/bcryptPassowrd');
const jwt = require('jsonwebtoken');
const LoginError = require('../../middlewear/customErrors/loginError');
const { StatusCodes } = require('http-status-codes');

//Validate the login_fields before atempting to login
const login_user = async (req, res, next) => {
  //extract login info from req.body
  const user_info = {
    email: req.body.email,
    password: req.body.password,
  };

  //Validate before creatung user
  const validation_result = userLoginValidation(user_info);

  //check if error object created
  const error = validation_result.error;
  if (error) {
    const loginError = new LoginError(error.details[0].message, StatusCodes.BAD_REQUEST);
    next(loginError);
    // console.log(error.details[0].message);
    // res.status(400);
    // res.send(error.details[0].message);
    return;
  }
  //checking if user exist in DB does NOT exist, using email
  const userExist = await User.findOne({ email: user_info.email });
  if (!userExist) {
    const loginError = new LoginError('Email does not exist', StatusCodes.BAD_REQUEST);
    next(loginError);
    return;
  }

  //password is correct
  const unHash_password = req.body.password;
  const hashed_password = userExist.password;

  const valid_password = await validatePassword(unHash_password, hashed_password);
  if (!valid_password) {
    const loginError = new LoginError('Invalid Password', StatusCodes.UNAUTHORIZED);
    next(loginError);
    return;
  }

  //create and assign a token base on _id, unique user id
  const token = jwt.sign(
    {
      _id: userExist._id,
    },
    process.env.JWT_TOKEN_SECRET
  );
  //add to res.header instead of body for the response
  //console.log('auth_token', token);
  res.header('auth_token', token);
  //Sucessful
  //send to be modified
  data = { auth_token: token };
  res.status(StatusCodes.OK);
  res.send(data);
  return;
};

module.exports = { login_user };
