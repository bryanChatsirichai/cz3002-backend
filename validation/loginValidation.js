//VALIDATION OF SCHEMA
const Joi = require("@hapi/joi");

//User login Validation
const userLoginValidation = (login_fields) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(login_fields);
  return result;
};

module.exports = userLoginValidation;
