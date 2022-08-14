const bcrypt = require("bcrypt");
const express = require("express");
const { boolean } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    minLength: 6,
    trim: true,
  },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: {
      $ne: excludeUserId,
    },
  });
  return !!user;
};

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const token = jwt.sign({ _id: this.id, email: this.email }, "jwtSecretKey");
  return token;
};

userSchema.pre("save", async function (next) {
  const rounds = 10; //What you want number for round password
  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
