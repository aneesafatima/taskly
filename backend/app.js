const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const errorController = require("./controllers/errorController");
const app = express(); //app is an instance of express
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const settingsRouter = require("./routes/settingsRouter");
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     credentials: true, // Allows credentials (cookies) to be sent
//   })
// );
app.use(express.json());
app.use(cookieParser());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req,res) => {
    res.status(200).json("Hello")
})
app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/tasks", taskRouter);
app.use("/settings", settingsRouter);
app.use("*", (res,req) => {
res.status(404).json({
    message: "Not Found"
})
})
app.use(errorController);

module.exports = app;
