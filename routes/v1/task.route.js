const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { taskValidation } = require("../../validations");
const { taskController } = require("../../controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(
    authMiddleware,
    validate(taskValidation.getTask),
    taskController.getTasks
  )
  .post(
    authMiddleware,
    validate(taskValidation.createTask),
    taskController.createTask
  );

router
  .route("/:id")
  .get(
    authMiddleware,
    validate(taskValidation.getTaskById),
    taskController.getTaskById
  )
  .put(
    authMiddleware,
    validate(taskValidation.editTask),
    taskController.editTask
  )
  .delete(
    authMiddleware,
    validate(taskValidation.deleteTask),
    taskController.deleteTask
  );

module.exports = router;
