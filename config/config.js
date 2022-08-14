/// Load environment variables from .env file
const dotenv = require("dotenv"); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const joi = require("joi");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test")
      .default("development"),
    PORT: joi.number().default(3000),
    MONGO_URI: joi.string().required().description("MongoDB connection URI"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: "key",
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(` validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
