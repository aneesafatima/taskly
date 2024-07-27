const express = require("express");
const {logIn, signUp, logOut, protect, updateMyPassword, updateMe } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(logIn);
userRouter.use(protect)
userRouter.route("/logout").post(logOut);
userRouter.route('/updateMyPassword').patch(updateMyPassword)
userRouter.route('/updateMe').patch(updateMe)

module.exports = userRouter;
