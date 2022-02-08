const httpStatusCodes = require("../httpStatusCodes");
const BaseError = require("../baseError");

class Api404Error extends BaseError {
  constructor(
    name,
    err = "Bad request from client",
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, err, statusCode, isOperational, description);
  }
}

module.exports = Api404Error;