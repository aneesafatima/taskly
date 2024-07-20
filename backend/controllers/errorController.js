const ErrorHandler = require( "../utils/ErrorHandler" );

const errorProd = (err, res) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  res.status(500).json({
    status: "Something went very wrong!",
    message: "Please try again later",
  });
};

const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const validationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new ErrorHandler(`Invalid Input data: ${errors[0]}`, 400)
};
const duplicateErrors = (err) => {
 return new ErrorHandler("This email is taken !", 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "production") {
    let error = {...err}
    if (err.name === "ValidationError") {
      error = validationError(err);
    }
  if(err.code === 11000)  
    error = duplicateErrors(err)

    errorProd(error, res);
  } else if (process.env.NODE_ENV === "development") errorDev(err, res);
};
