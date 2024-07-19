const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    tasks,
  });
};
exports.createTask = async (req, res, next) => {
  req.body.user = req.user.id;
  const newTask = await Task.create(req.body);
  res.status(201).json({
    statsu: "success",
    task: newTask,
  });
};
exports.deleteTask = async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.status(204).json({
    status: "success",
  });
};

exports.updateTask = async (req, res, next) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    task: updatedTask,
  });
};
