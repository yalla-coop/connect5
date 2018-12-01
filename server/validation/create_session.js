const Joi = require("joi");

const validate = data => new Promise((resolve, reject) => {
  const schema = Joi.object().keys({
    sessionType: Joi.number().min(0).max(3).required(),
    startDate: Joi.date().required(),
    inviteesNumber: Joi.number().integer().min(0).required(),
  });

  const result = Joi.validate(data, schema);

  return !result.error ? resolve() : reject(result.error.details[0].message)
});

module.exports = validate;
