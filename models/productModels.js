"use strict";
const { db } = require("../helpers");
const { Api404Error, Api500Error } = require("../utils/Error");
const { OK } = require("../utils/httpStatusCodes.js");
const { responseData, responseMessage } = require("../utils/response-handler");

module.exports = {
  searchProductMdl: async function (response, getStatement, data, next) {
    const columns = [
      "id_master_produk",
      "nm_master_produk",
      "harga",
      "description",
      "URL",
    ];
    try {
      const { productName, pagLimit, page } = data;
      // INJECT QUERY
      const getDatas = await db
        .query(getStatement, [columns, productName, pagLimit, page])
        .catch((err) => {
          throw new Api500Error("gagal mendapatkan produk", err);
        });

      if (!getDatas.length)
        throw new Api404Error("Product not found, Try another keyword");

      responseData(response, OK, getDatas);
    } catch (error) {
      next(error);
    }
  },
};
