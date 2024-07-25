const express = require("express");
const { protect } = require("../controllers/authController");
const { getAllTasks } = require("../controllers/taskController");
const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getAllTasks);

module.exports = dashboardRouter;
