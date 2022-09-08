//acess .env variables
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = require("../configs/firebaseConfig");
const { signInWithEmailAndPassword } = require("../service/signInUser");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//to edit -to be added email is verified
const signIn_user = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    //signIn the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const curUser = userCredential.user;
    console.log("result1 ", curUser);
    //check if email is verified
    const emailStatus = curUser.emailVerified;
    if (emailStatus != true) {
      //not verified
      res.json({
        success: false,
        message: "Email not verified",
      });
      return;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode);
    console.log(errorMessage);
    res.json({
      success: false,
      message: errorMessage,
    });
    return;
  }
  res.json({
    success: true,
    message: "signIn user",
  });
  return;
};

module.exports = { signIn_user };
