const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
dotenv.config({ path: "./.env" });
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const errorController = require("./src/controllers/errorController");
const app = express(); //app is an instance of express
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const settingsRouter = require("./routes/settingsRouter");
const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

//ERROR HANDLING

// This will catch any uncaught exceptions from anywhere in your app
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
// This will catch any unhandled promise rejections from anywhere in your app
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  // Attempt to close server gracefully before exiting
  server.close(() => {
    process.exit(1);
  });
});

// Middleware setup
// Set Security HTTP Headers using Helmet
app.use(helmet());

// Data Sanitization against NoSQL Injection attacks
app.use(mongoSanitize());

// Data Sanitization against XSS attacks
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());
app.use(
  cors(
    {
      origin: [
        "https://taskly-frontend-omega.vercel.app",
        "http://localhost:5173",
      ], // Your frontend origin
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
      credentials: true,
    } // Allows credentials (cookies) to be sent
  )
);

app.use(express.json());
app.use(cookieParser());
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/settings", settingsRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});
app.use(errorController);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Mongodb connected");

    if (process.env.NODE_ENV === "development") {
      const server = http.createServer(app);
      server.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("DATABASE CONNECTION ERROR:", err);
    process.exit(1); //appication halting with an error
  });

module.exports = app;
