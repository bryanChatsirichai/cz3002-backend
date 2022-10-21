//VALIDATION OF SCHEMA
const Joi = require('@hapi/joi');
//Profile Validation
const profileValidation = (profile_fields) => {
  const schema = Joi.object({
    //tie to each user
    userId: Joi.string().required(),
    //profile of user
    name: Joi.string().required(),
    xp: Joi.number().required(),
    gold: Joi.number().required(),
  });
  const result = schema.validate(profile_fields);
  return result;
};

module.exports = profileValidation;
