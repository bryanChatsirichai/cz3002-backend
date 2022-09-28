//VALIDATION OF SCHEMA
const Joi = require("@hapi/joi");

//TTask Validation
const taskValidation = (login_fields) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    detail: Joi.string().required(),
  });
  const result = schema.validate(login_fields);
  return result;
};

module.exports = taskValidation;
