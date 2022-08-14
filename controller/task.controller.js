const catchAsync = require("../utils/catchAsync");
const { taskService } = require("../services");
const { lodash } = require("lodash");

const getTasks = catchAsync(async (req, res) => {
  const result = await taskService.getTasks(req.user._id);
  res.send(result);
});

const createTask = catchAsync(async (req, res) => {
  const result = await taskService.createTask(req.body);
  res.send(result);
});

const getTaskById = catchAsync(async (req, res) => {
  const result = await taskService.getTaskById(req.params.id);
  res.send(result);
});

const editTask = catchAsync(async (req, res) => {
  const result = await taskService.editTask(req.params.id, req.body);
  res.send(result);
});

const deleteTask = catchAsync(async (req, res) => {
  const result = await taskService.deleteTask(req.params.id);
  if (!result) {
    return res.status(400).send({
      message: "Task not found",
    });
  }
  res.send(result);
});

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  editTask,
  deleteTask,
};
