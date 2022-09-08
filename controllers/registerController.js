//acess .env variables
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = require("../configs/firebaseConfig");
const {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} = require("../service/registerUser");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//to edit
const register_user = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    //register the user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const curUser = userCredential.user;
    await sendEmailVerification(curUser);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode);
    console.log(errorMessage);
  }
  //Edit the response message later
  res.json(req.body);
};

module.exports = { register_user };
