const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const register = catchAsync(async (req, res) => {
  const result = await userService.register(req.body);
  res.send(result);
});

const login = catchAsync(async (req, res) => {
  const result = await userService.login(req.body);
  console.log(result);
  res.send(result);
});

module.exports = {
  login,
  register,
};
