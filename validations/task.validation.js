const Joi = require("joi");

const createTask = {
  //validate body
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().valid("To Do", "In Progress", "Done"),
    userId: Joi.string(),
  }),
};

const getTask = {};

const getTaskById = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const editTask = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().valid("To Do", "In Progress", "Done"),
    userId: Joi.string(),
  }),
};

const deleteTask = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

module.exports = {
  createTask,
  getTask,
  getTaskById,
  deleteTask,
  editTask,
};
