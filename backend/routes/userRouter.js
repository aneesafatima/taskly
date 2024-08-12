const express = require("express");
const {
  logIn,
  signUp,
  logOut,
  protect,
  updateMyPassword,
  updateMe,
  deleteMe,
} = require("../src/controllers/authController");
const userRouter = express.Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(logIn);
userRouter.use(protect);
userRouter.route("/logout").get(logOut);
userRouter.route("/updateMyPassword").patch(updateMyPassword);
userRouter.route("/updateMe").patch(updateMe);
userRouter.route("/deleteMe/:userId").delete(deleteMe);

module.exports = userRouter;
