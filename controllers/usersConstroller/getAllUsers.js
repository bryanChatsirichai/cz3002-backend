require('dotenv').config();
const User = require('../../service/authServices/getAllusers');
const { StatusCodes } = require('http-status-codes');
const getAllUsers = async (req, res, next) => {
  console.log('get all users');
  const result = await User.find({});
  //console.log(result);

  //extract out the names only
  const users = result.map((user) => {
    return user.name;
  });

  //filter out own name from users list
  const own_name = req.body.name;
  const filtered_user = users.filter((user) => {
    return user != own_name;
  });
  //console.log(filtered_user);
  res.status(200);
  //array list of names (Strings)
  res.send(filtered_user);
  return;
};

module.exports = getAllUsers;
