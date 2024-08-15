const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");

const sendToken = (user, statusCode, res) => {
  const token = createSendToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
    httpOnly: true,
    path: "/",
  });
  
  res.status(statusCode).json({
    status: "success",
    token,
    user: user,
  });
};

const createSendToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const filterObject = (req, ...data) => {
  const filteredObject = {};
  data.forEach((el) => {
    if (data.includes(el)) {
      filteredObject[el] = req[el];
    }
  });
  return filteredObject;
};
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  sendToken(user, 201, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter email or password", 401));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswords(password, user.password)))
    return next(new ErrorHandler("Invalid email or password", 401));
  sendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("B"))
    token = authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token)
    return next(
      new ErrorHandler(
        "You are not logged in ! Please log in to access the page.",
        400
      )
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findOne({ _id: decoded.id });

  if (!currentUser)
    return next(new ErrorHandler("There is no user belonging to this Id", 400));

  console.log(currentUser);

  //check if token was issued before the password was changed

  if (currentUser.passwordChangedAfter(decoded.iat))
    return next(new ErrorHandler("Your password was changed recently", 400));

  req.user = currentUser;

  //promisify returns a promise based version of the jwt.verify function which we are immediatedly calling in the next step

  next();
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, newPassword } = req.body;
  console.log(req.body);
  const user = await User.findOne({ _id: req.user._id }).select("+password");
  console.log(user);

  if (!password || !(await user.comparePasswords(password, user.password)))
    return next(new ErrorHandler("Invalid password", 400));
  //add a middleware to set a passwordChangedAt date

  console.log("correct");
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save(); //validators for all the fields are run

  sendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredObject = filterObject(req.body, "name", "email", "status");

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filteredObject,
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000), //this property expects a date object
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: process.env.NODE_ENV === "development" ? "Strict" : "None",
    path: "/",
    //only when in dev mode send the cookie over http otherwise https
    httpOnly: true, //to prevent cross-site scripting; meaning the cookie won't be accessible over clientside
  });
  res.status(200).json({
    status: "success",
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  await User.findByIdAndDelete(userId);
  res.status(204).json({
    status: "success",
  });
});
