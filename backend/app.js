const express = require("express");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const errorController = require('./controllers/errorController')
const app = express(); //app is an instance of express
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", taskRouter);
app.use(errorController)

module.exports = app;
