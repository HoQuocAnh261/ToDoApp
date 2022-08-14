const Joi = require("joi");
const _ = require("lodash");

const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "body", "query"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: {
        label: "key",
      },
      abortEarly: false,
    })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    res.send({
      status: 400,
      message: errorMessage,
    });
    //TODO: Move to next error handler middleware
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
