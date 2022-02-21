"use strict";
const jwt = require("jsonwebtoken");

const { Api404Error } = require("../utils/Error");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../utils/httpStatusCodes");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, "private123", (err, decode) => {
      if (err) {
        return res.status(401).send("User is not authorized");
      }
      req.user = decode;

      next();
    });
  },
};
