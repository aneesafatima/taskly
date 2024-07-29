const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const todoTasks = await Task.find({ user: req.user, status: "todo" }).sort({
    order: 1,
  });
  const progressTasks = await Task.find({
    user: req.user,
    status: "progress",
  }).sort({ order: 1 });
  const completedTasks = await Task.find({
    user: req.user,
    status: "completed",
  }).sort({ order: 1 });
  res.status(200).json({
    status: "success",
    user: req.user,
    tasks: { todoTasks, progressTasks, completedTasks },
  });
});
exports.createTask = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const count = await Task.countDocuments({
    user: req.body.user,
    status: req.body.status,
  });
  req.body.order = count + 1;
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
  if (req.body.status) {
    const count = await Task.countDocuments({
      user: req.user._id,
      status: req.body.status,
    });
    req.body.order = count + 1;
  }
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
