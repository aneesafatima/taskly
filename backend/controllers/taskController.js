const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({user: req.user})
    res.status(200).json({
        status: "success",
        user: req.user,
        tasks
    })
});
exports.createTask = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const newTask = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    task: newTask,
  });
});
exports.deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.status(200).json({
    status: "success",
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  //filter tasks so only certain fields can be updated
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    task: updatedTask,
  });
});
