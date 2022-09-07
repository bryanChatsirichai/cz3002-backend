//acess .env variables
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const firebaseConfig = require("../configs/firebaseConfig");
const { createUserWithEmailAndPassword } = require("../service/registerUser");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//to edit
const register_user = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      //console.log(userCredential);
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      //console.log(errorCode);
      //console.log(errorMessage);
    });
  res.json(req.body);
};

module.exports = { register_user };
