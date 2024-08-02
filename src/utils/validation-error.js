const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");

class ValidationError extends AppErrors {
  constructor(error) {
    const errorName = error.name;
    const explanation = error.errors.map(err => err.message);

    super(
      errorName,
      "Not able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
