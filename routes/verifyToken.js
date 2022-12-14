//private route
//access .env variables
require('dotenv').config();
const jwt = require('jsonwebtoken');
const VerificationError = require('../middlewear/customErrors/verificationError');
const { StatusCodes } = require('http-status-codes');
//middlewear function to routes that are to be protected
//Every private route to access will use this middlewear to check token available and legit
//can add to any route that are to be protected by auth-token
//oken is assign to user logged IN, added to res.header
const auth = async (req, res, next) => {
  //get from header
  const token = req.header('auth_token');
  //console.log('auth_token', token);
  if (!token) {
    //auth-token does not exist
    const verificationError = new VerificationError('Access Denied', StatusCodes.UNAUTHORIZED);
    next(verificationError);
    return;
  }
  try {
    //check auth-token from header
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // _id (user_id), will be return if verify success
    //_id will be available to the next middlewear, /route etc...
    //cannot directly pass data to the next middleware, but we can send data through the request object.
    req.user = verified; //jwt payload
    req.body.user = verified;
    next();
  } catch (error) {
    //fail verification
    const verificationError = new VerificationError('Invalid Token', StatusCodes.NOT_ACCEPTABLE);
    next(verificationError);
    return;
  }
};

module.exports = auth;
