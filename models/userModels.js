"use strict";

const { db, RajaOngkirHelper } = require("../helpers");
const { Api404Error, Api500Error } = require("../utils/Error");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../utils/httpStatusCodes");

const {
  responseData,
  responError,
  responseMessage,
} = require("../utils/response-handler");
