const express = require("express");
const {logIn, signUp } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(logIn);

module.exports = userRouter;
