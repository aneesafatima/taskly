const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");

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
  const { array, container } = req.body;

  const bulkOps = array.map((el, i) => ({
    updateOne: {
      filter: { _id: el._id },
      update: { $set: { order: i } },
    },
  }));

  const tasks = await Task.bulkWrite(bulkOps);

  res.status(200).json({
    status: "success",
  });
});

/*todoTasks
: 
Array(4)
0
: 
{_id: '66a8befcf1f84021c65ef085', title: 'second', startDate: '2024-07-30T10:22:45.563Z', dueDate: '2024-07-30T10:22:45.563Z', priority: 'low', …}
1
: 
{_id: '66a8bef3f1f84021c65ef07a', title: 'first', startDate: '2024-07-30T10:22:37.792Z', dueDate: '2024-07-30T10:22:37.792Z', priority: 'low', …}
2
: 
{_id: '66a8bf36f1f84021c65ef090', title: 'third', startDate: '2024-07-30T10:23:45.134Z', dueDate: '2024-07-30T10:23:45.134Z', priority: 'low', …}
3
: 
{_id: '66a8bf41f1f84021c65ef09b', title: 'fourth', startDate: '2024-07-30T10:23:55.077*/
