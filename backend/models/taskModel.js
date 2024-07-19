const mongoose = require("mongoose");
const validator = require("validator");

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
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: "Due Date must be greater than start date",
    },
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  Status: {
    type: String,
    enum: ["to-do", "in progress", "completed"],
    default: "to-do",
  },
  tags: {
    type: [String],
  },
  lastUpdated: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference
    required: [true, "a task must belong to a user"],
  },
});

//Middleware to set the lastUpdated automatically the first time
taskSchema.pre("save", function (next) {
 this.lastUpdated = new Date();
  next();
});
const Task = new mongoose.model("Tasks", taskSchema);

module.exports = Task;
