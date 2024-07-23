const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A task must have a title"],
  },
  description: String,
  startDate: {
    type: Date,
    required: [true, "A task must have a start date"],
  },
  dueDate: Date,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  status: {
    type: String,
    enum: ["todo", "progress", "completed"],
    default: "to-do",
  },
  tags: {
    type: [String],
  },
  lastUpdated: {
    type: Date,
    default: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      hour12: true,
    }),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference
    required: [true, "a task must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startTime: Date,
  endType: Date,
});

//Middleware to set the lastUpdated automatically the first time


taskSchema.pre("save", function (next) {
  if (!(this.dueDate >= this.startDate))
    return next(
      new ErrorHandler("Due date must be greater than Start date", 400)
    );
  next();
});

taskSchema.pre("findOneAndUpdate", async function (next) {
 this.getUpdate().lastUpdated = new Date();
  if (!(this.getUpdate().dueDate >= this.getUpdate().startDate))
    return next(
      new ErrorHandler("Due date must be greater than Start date", 400)
    );``
  next();
});




const Task = new mongoose.model("Tasks", taskSchema);

module.exports = Task;
