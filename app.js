require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const customErroHandler = require('./middlewear/customErrors/customErrorHandler');
//const csrf = require("csurf");
//const path = require("path");
//const logger = require("morgan");

const app = express();

const corsOptions = {
  exposedHeaders: 'auth_token',
};
//enable cross origin
app.use(cors(corsOptions));

//routes
const usersRouter = require('./routes/user');
const homeRouter = require('./routes/home');

// MiddleWear
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

//app.use(logger("dev"));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); //body-parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Route middleware
//Note: some routes are nested
app.use('/user', usersRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Page Not found'));
});

// error handler
app.use(customErroHandler);

//Connect to DB upon start-up
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECT);
    console.log('MongoDB connection establish');
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
module.exports = app;
