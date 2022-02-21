const httpStatusCodes = require("../httpStatusCodes");
const BaseError = require("../baseError");

class Api400Error extends BaseError {
  constructor(
    name,
    err,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Bad Request from client.",
    isOperational = true
  ) {
    super(name, err, statusCode, isOperational, description);
  }
}

module.exports = Api400Error;
