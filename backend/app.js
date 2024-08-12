const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);
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

app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/settings", settingsRouter);
app.use("*", (req,res) => {
res.status(404).json({
    message: "Not Found"
})
})
app.use(errorController);

mongoose
  .connect(DB, {})
  .then(() => console.log("SUCCESSFULLY CONNECTED TO DATABASE"))
  .catch((err) => {
    console.error("DATABASE CONNECTION ERROR:", err);
    process.exit(1); //appication halting with an error
  });
  
  if (process.env.NODE_ENV === "development") {
    const server = app.listen(process.env.PORT, () => {
      //listening for requests to the specified port
      console.log("Listening...");
    }); //this returns a server
  }

module.exports = app;
