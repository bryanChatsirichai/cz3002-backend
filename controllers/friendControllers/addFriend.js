//let adding friend be both ways
require('dotenv').config();
const uuid = require('uuid');
const Profile = require('../../service/profileServices/updateProfile');
const User = require('../../service/authServices/getAllusers');
const axios = require('axios');
const ProfileError = require('../../middlewear/customErrors/profileError');
const { StatusCodes } = require('http-status-codes');

const addFriend = async (req, res, next) => {
  //sender profile id
  //console.log(req.body);
  const profile_info = {
    userId: req.body.user._id,
  };
  console.log('Adding friend');
  let result;
  let profile;
  let friends;
  let users;
  let senderName;
  let receiverName;
  let sender_profile_friends;
  let receiver_profile_friends;
  const friendToAdd = req.body.friend;

  //check friend exist
  try {
    result = await User.find({});
    //extract out the names only
    users = result.map((user) => {
      return user.name;
    });
  } catch (error) {
    const profileError = new ProfileError('Error Retriving user profile', StatusCodes.BAD_REQUEST);
    next(profileError);
  }
  //console.log(users);
  //assume no duplicate
  result = users.includes(friendToAdd);
  if (!result) {
    //false skip do nothing
    res.status(StatusCodes.BAD_REQUEST);
    res.send('friend does not exist');
    return;
  }
  //update sender freind list
  //retrive sender profile friend array
  try {
    result = await Profile.find(profile_info);
    profile = result[0];
    senderName = profile.name;
    sender_profile_friends = profile.friends;
  } catch (error) {
    const profileError = new ProfileError('Error Retriving user profile', StatusCodes.BAD_REQUEST);
    next(profileError);
  }
  //cant addd your self
  if (friendToAdd === profile.name) {
    res.status(StatusCodes.BAD_REQUEST);
    res.send('Cant add your self');
    return;
  }

  //check if inside already
  result = sender_profile_friends.some((friend) => friend.name === friendToAdd);
  if (result) {
    //true
    console.log('no need1');
    res.status(200);
    res.send('No need add as already friends1');
    return;
  }
  //add to sender profile friend list
  sender_profile_friends.push({
    id: uuid.v4(),
    name: friendToAdd,
    added: true,
    profile_pic: 0,
  });

  //update receiver friend list
  receiverName = friendToAdd;
  //assume profile no duplicate name
  try {
    result = await Profile.find({ name: receiverName });
    profile = result[0];
    receiver_profile_friends = profile.friends;
  } catch (error) {
    const profileError = new ProfileError('Error Retriving user profile', StatusCodes.BAD_REQUEST);
    next(profileError);
  }
  //check if inside already
  result = receiver_profile_friends.some((friend) => friend.name === senderName);
  if (result) {
    //true
    console.log('no need2');
    res.status(200);
    res.send('No need add as already friends2');
    return;
  }
  receiver_profile_friends.push({
    id: uuid.v4(),
    name: senderName,
    added: true,
    profile_pic: 0,
  });

  //write back to DB
  try {
    await Profile.updateOne({ name: senderName }, { $set: { friends: sender_profile_friends } });
    await Profile.updateOne({ name: receiverName }, { $set: { friends: receiver_profile_friends } });
    //response
    console.log('added');
    res.status(200);
    res.send([sender_profile_friends, receiver_profile_friends]);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    res.send(error);
  }

  return;
};

module.exports = addFriend;
