//access .env variables
require("dotenv").config();
const User = require("../../service/authServices/loginUser");
const userLoginValidation = require("../../validation/loginValidation");
const { validatePassword } = require("../../service/authServices/bcryptPassowrd");
const jwt = require("jsonwebtoken");

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
    res.status(400);
    res.send(error.details[0].message);
    return;
  }
  //checking if user exist in DB does NOT exist, using email
  const userExist = await User.findOne({ email: user_info.email });
  if (!userExist) {
    res.status(400);
    res.send("Email does not exist");
    return;
  }

  //password is correct
  const unHash_password = req.body.password;
  const hashed_password = userExist.password;

  const valid_password = await validatePassword(
    unHash_password,
    hashed_password
  );
  if (!valid_password) {
    //fail
    res.status(400);
    res.send("Invalid password");
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
  res.header("auth-token", token);
  //Sucessful
  //send to be modified
  res.send(token);
  return;
};

module.exports = { login_user };
