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

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") errorProd(err, res);
  else if (process.env.NODE_ENV === "development") errorDev(err, res);
};
