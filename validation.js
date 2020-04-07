const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number(),
    age: Joi.number(),
    birthday: Joi.date(),
    password: Joi.string().pattern(new RegExp("^[a-zA-z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
  });
  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-z0-9]{3,30}$")),
  });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
