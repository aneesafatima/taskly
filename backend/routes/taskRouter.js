const express = require("express");
const {getAllTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const {protect} = require("../controllers/authController");
const taskRouter = express.Router();
taskRouter.use(protect); // making sure the user is logged in
taskRouter.route('/').get(getAllTasks).post(createTask)
taskRouter.route('/:taskId').patch(updateTask).delete(deleteTask)

module.exports = taskRouter;
