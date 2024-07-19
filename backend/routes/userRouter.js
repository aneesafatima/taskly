const express = require("express");
const {logIn, signUp, logOut } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(logIn);
userRouter.route("/logout").post(logOut);

module.exports = userRouter;
