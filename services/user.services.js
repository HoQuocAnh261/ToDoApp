const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const res = require("express/lib/response");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const register = async (userBody) => {
  const oldUser = await User.findOne({ email: userBody.email });
  if (oldUser) {
    throw new ApiError(httpStatus.CONFLICT, "User Already Exist. Please Login");
  }
  const user = await User.create(userBody);
  return user;
};

const login = async (userBody) => {
  const user = await User.findOne({ email: userBody.email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }
  const isValidPassword = await bcrypt.compare(
    userBody.password,
    user.password
  );
  if (!isValidPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }
  const token = user.generateAuthToken();
  return token;
};

module.exports = {
  register,
  login,
};
