const httpStatusCodes = require("../httpStatusCodes");
const BaseError = require("../baseError");

class Api401Error extends BaseError {
  constructor(
    name,
    err,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = "Should authentication.",
    isOperational = true
  ) {
    super(name, err, statusCode, isOperational, description);
  }
}

module.exports = Api401Error;