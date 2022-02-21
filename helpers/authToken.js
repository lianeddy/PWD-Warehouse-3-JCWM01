"use strict";
const jwt = require("jsonwebtoken");

const { Api401Error } = require("../utils/Error");
const { db } = require("./Database");

module.exports = {
  // auth: (req, res, next) => {
  //   jwt.verify(req.token, "private123", (err, decode) => {
  //     if (err) {
  //       return res.status(401).send("User is not authorized");
  //     }
  //     req.user = decode;
  //     console.log(req.user);
  //     next();
  //   });
  // },

  auth: async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, "private123");
      // compare decoded data to db data
      const user = await db
        .query(`SELECT * FROM sys_user WHERE id_user=${decoded.id_user}`)
        .catch((e) => {
          throw new Api401Error("Please authentication", e);
        });

      req.token = token;
      req.user = user[0];
      next();
    } catch (err) {
      next(err);
    }
  },
};
