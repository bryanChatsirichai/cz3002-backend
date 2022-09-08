const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
//const path = require("path");
//const logger = require("morgan");

//routes
const usersRouter = require("./routes/users");

//acess .env variables
require("dotenv").config();

const app = express();

// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

//app.use(logger("dev"));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//routes
//Note: some routes are nested
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Page Not found"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render("error")
  res.send({ success: false, message: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = app;
