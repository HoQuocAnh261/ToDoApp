const httpStatus = require("http-status");
const res = require("express/lib/response");
const { Task, User } = require("../models");
const ApiError = require("../utils/ApiError");

const getTasks = async (userId) => {
  const tasks = await Task.find({ userId }).select("name status createdAt");
  return tasks;
};

const createTask = async (taskBody) => {
  const user = await User.findById(taskBody.userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  const task = await Task.create(taskBody);
  return task;
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

const editTask = async (taskId, editBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found ");
  }
  Object.assign(task, editBody);
  await task.save();
  return task;
};

const deleteTask = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task Not Found ");
  }
  await task.remove();
  return task;
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  editTask,
  deleteTask,
};
