const httpStatusCodes = require("../httpStatusCodes");
const BaseError = require("../baseError");

class Api500Error extends BaseError {
  constructor(
    name,
    err,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = "Something wrong in server.",
    isOperational = true
  ) {
    super(name, err, statusCode, isOperational, description);
  }
}

module.exports = Api500Error;
