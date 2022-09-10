//VALIDATION OF SCHEMA
const Joi = require("@hapi/joi");
//User Registration Validation
const userRegisterValidation = (user_fields) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(user_fields);
  return result;
};

module.exports = userRegisterValidation;
