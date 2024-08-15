const Task = require("../../models/taskModel");
const catchAsync = require("../../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const todo = await Task.find({ user: req.user, status: "todo" }).sort({
    order: 1,
  });
  const progress = await Task.find({
    user: req.user,
    status: "progress",
  }).sort({ order: 1 });
  const completed = await Task.find({
    user: req.user,
    status: "completed",
  }).sort({ order: 1 });
  res.status(200).json({
    status: "success",
    user: req.user,
    tasks: { todo, progress, completed },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.order = await Task.countDocuments({
    user: req.body.user,
    status: req.body.status,
  });

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

  console.log("update tasks");
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

exports.updateTasksOrder = catchAsync(async (req, res, next) => {
  const { data } = req.body;

  const bulkOps = data.array.map((el, i) => ({
    updateOne: {
      filter: { _id: el._id },
      update: { $set: { order: i, status: data.section } },
    },
  }));

  await Task.bulkWrite(bulkOps);

  res.status(200).json({
    status: "success",
  });
});
