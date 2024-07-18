module.exports = class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //First the constructor of super class needs to be callled
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
};
