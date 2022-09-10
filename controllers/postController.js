const User = require("../service/loginUser");
const post = async (req, res, next) => {
  //find user base on token
  try {
    console.log("req.user", req.user);
    console.log("req.body.user", req.body.user);
    let user_fields = await User.findOne({ _id: req.user._id });
    res.status(200);
    res.send(user_fields);
    console.log("============");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = post;
