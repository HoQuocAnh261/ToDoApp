const Joi = require("joi");

const registerUser = {
  //validate body
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const loginUser = {
  //validate body
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

module.exports = {
  registerUser,
  loginUser,
};
