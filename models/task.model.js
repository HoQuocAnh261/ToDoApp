const bcrypt = require("bcrypt");
const express = require("express");
const { boolean } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //remove whitespace from begin end of string
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true } // auto adds createdAt and updateAt fields
);

taskSchema.pre("save", async function (next) {
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
