const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const errorController = require("./controllers/errorController");
const app = express(); //app is an instance of express
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allows credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", taskRouter);
app.use(errorController);

module.exports = app;
