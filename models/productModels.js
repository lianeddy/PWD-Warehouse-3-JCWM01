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
    const { productName, pagLimit, page } = data;
    try {
      // INJECT QUERY
      const getDatas = await db
        .query(getStatement, [columns, productName, pagLimit, page])
        .catch((err) => {
          throw new Api500Error("gagal mendapatkan produk", err);
        });

      if (!getDatas.length)
        throw new Api404Error("Product not found, Try another keyword");

      responseData(response, OK, getDatas);
    } catch (err) {
      next(err);
    }
  },
  getProductsByFilterMdl: async function (response, getStatement, data, next) {
    // INJECT QUERY
    const columns = [
      `id_master_produk`,
      `nm_master_produk`,
      `harga`,
      `description`,
      `app_category_master_produk.nm_category_master_produk`,
      `URL`,
    ];
    const { page, category, pagLimit } = data;
    // RESPONSUCCES
    try {
      const datas = await db
        .query(getStatement, [columns, category, pagLimit, page])
        .catch((err) => {
          throw new Api500Error("gagal mendapatkan produk", err);
        });

      if (!datas.length) throw new Api404Error("Product not found");

      responseData(response, OK, datas);
    } catch (err) {
      // ERROR HADLING TO MIDDLEWARE
      next(err);
    }
  },
};
