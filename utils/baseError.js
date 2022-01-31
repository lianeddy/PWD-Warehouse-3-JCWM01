class BaseError extends Error {
  constructor(name, err, statusCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
