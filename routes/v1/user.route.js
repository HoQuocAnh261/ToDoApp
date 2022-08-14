const validate = require("../../middlewares/validate.middleware");
const { userValidation } = require("../../validations");
const { userController } = require("../../controller");
const express = require("express");
const router = express.Router();

router.post(
  "/register",
  validate(userValidation.registerUser),
  userController.register
);

router.post("/login", validate(userValidation.loginUser), userController.login);

module.exports = router;
