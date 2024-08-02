const { StatusCodes } = require("http-status-codes");

class AppErrors extends Error {
  constructor(
    name,
    message = "Something went wrong",
    explanation = "Something went wrong",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message); // Call parent class constructor
    this.name = name;
    this.explanation = explanation;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // Captures stack trace
  }
}

module.exports = AppErrors;
