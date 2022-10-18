const RegisterError = require('./registerError');
const LoginError = require('./loginError');
const VerificationError = require('./verificationError');
const TaskError = require('./taskError');

//custom error handler middlewear
const customErroHandler = (err, req, res, next) => {
  if (err instanceof RegisterError) {
    res.status(err.status || 400);
    //res.render("error")
    res.send({ success: false, message: err.message });
    return;
  }

  if (err instanceof LoginError) {
    res.status(err.status || 400);
    //res.render("error")
    //console.log("login error")
    res.send({ success: false, message: err.message });
    return;
  }

  if (err instanceof VerificationError) {
    res.status(err.status || 400);
    //res.render("error")
    res.send({ success: false, message: err.message });
    return;
  }
  if (err instanceof TaskError) {
    res.status(err.status || 400);
    //res.render("error")
    res.send({ success: false, message: err.message });
    return;
  }
  //set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render("error")
  res.send({ success: false, message: err.message });
  return;
};

module.exports = customErroHandler;
