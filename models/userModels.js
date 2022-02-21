"use strict";

const { db, createToken } = require("../helpers");
const { Api400Error, Api500Error, Api401Error } = require("../utils/Error");
const { OK } = require("../utils/httpStatusCodes");

const {
  responseData,
  responError,
  responseMessage,
} = require("../utils/response-handler");

module.exports = {
  // FIXME
  loginMdl: async function (response, getStatement, email, password, next) {
    const columns = [
      "id_user",
      "id_warehouse",
      "id_role",
      "username",
      "email",
      "full_name",
      "gender",
      "birth_date",
      "phone",
      "is_valid",
    ];

    try {
      const user = await db
        .query(getStatement, [columns, email, password])
        .catch((e) => {
          throw new Api500Error("something wrong in server", e);
        });

      if (user.length) {
        const token = createToken({ ...user[0] });
        if (user[0].is_valid) {
          responseData(response, OK, {
            ...user[0],
            token,
          });
        } else {
          throw new Api401Error("Use verified account");
        }
      } else {
        throw new Api400Error("Incorrect email/password");
      }
    } catch (err) {
      next(err);
    }
  },
};
