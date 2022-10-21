//VALIDATION OF SCHEMA
const Joi = require('@hapi/joi');

//TTask Validation
const taskValidation = (login_fields) => {
  const schema = Joi.object({
    //user unqie
    userId: Joi.string().required(),
    //uuid of task given by FE
    task: Joi.string().required(),
    id: Joi.string().required(),
    priority: Joi.string().required(),

    //default set to false by mongo
    //completed: Joi.boolean().required(),
  });
  const result = schema.validate(login_fields);
  return result;
};

module.exports = taskValidation;
