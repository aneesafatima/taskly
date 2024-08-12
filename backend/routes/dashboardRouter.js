const express = require("express");
const { protect } = require("../src/controllers/authController");
const { getAllTasks } = require("../src/controllers/taskController");
const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getAllTasks);

module.exports = dashboardRouter;
