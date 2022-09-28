//acess .env variables
require("dotenv").config();
const User = require("../../service/authServices/registerUser");
const userRegisterValidation = require("../../validation/userValidation");
const { hashPassword } = require("../../service/authServices/bcryptPassowrd");

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
    res.status(400);
    res.send(error.details[0].message);
    return;
  }

  //checking if user already in DB by email
  const userExist = await User.findOne({ email: user_info.email });
  if (userExist) {
    res.status(400);
    res.send("Email already exists");
    return;
  }

  //Hash password
  const hashedPassword = await hashPassword(user_info.password);

  //update user_info
  user_info.password = hashedPassword;

  //create new user
  // _id field automatically by mongo for the entry
  const user = new User(user_info);
  try {
    const savedUser = await user.save();
    //res.send({ user: savedUser._id });
    res.status(201);
    res.send({ success: true, message: "User created" });
    return;
  } catch (error) {
    //fail to save to DB
    res.status(400);
    res.send(error);
    return;
  }
};

module.exports = { register_user };
