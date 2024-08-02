const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");

class ClientError extends AppErrors {
  constructor(error) {
    super(
      error.name,
      "Not able to validate the data sent in the request",
      error.explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ClientError;
