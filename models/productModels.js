"use strict";
const { db } = require("../helpers");
const { Api404Error, Api500Error } = require("../utils/Error");
const { OK } = require("../utils/httpStatusCodes.js");
const { responseData, responseMessage } = require("../utils/response-handler");

module.exports = {
  searchProductMdl: async function (
    response,
    countStatement,
    getStatement,
    data,
    next
  ) {
    const columns = [
      "id_master_produk",
      "nm_master_produk",
      "harga",
      "description",
      "URL",
    ];

    const { productName, pagLimit, offset, page } = data;

    try {
      // INJECT QUERY
      const countSearch = await db
        .query(countStatement, productName)
        .catch((e) => {
          throw new Api500Error("Gagal menghitung produk", e);
        });

      // send this data to client back
      const data = { ...countSearch[0] };
      // add pagLimit
      data.pagLimit = pagLimit;
      data.maxPage = Math.ceil(data.count / data.pagLimit);
      data.nextPage = +page + 1;
      if (+data.nextPage > 1) data.prevPage = page - 1;
      if (+data.maxPage === +page) data.nextPage = undefined;
      if (+page === 1) data.prevPage = undefined;
      // data.nextPage =
      if (countSearch.length) {
        const products = await db
          .query(getStatement, [columns, productName, pagLimit, offset])
          .catch((err) => {
            throw new Api500Error("gagal mendapatkan produk", err);
          });

        // add product list
        data.products = products;

        responseData(response, OK, data);
      } else {
        throw new Api404Error("Product not found, Try another keyword");
      }

      // if (!products.length)
    } catch (err) {
      next(err);
    }
  },
  getProductsByFilterMdl: async function (
    response,
    countStatement,
    getStatement,
    data,
    next
  ) {
    // INJECT QUERY
    const columns = [
      `id_master_produk`,
      `nm_master_produk`,
      `harga`,
      `description`,
      `app_category_master_produk.nm_category_master_produk`,
      `URL`,
    ];
    const { page, offset, id_category, pagLimit } = data;
    // RESPONSUCCES
    try {
      const count = await db.query(countStatement, id_category).catch((e) => {
        throw new Api500Error("Gagal menghitung produk", e);
      });

      if (count.length) {
        const datas = await db
          .query(getStatement, [columns, id_category, pagLimit, offset])
          .catch((err) => {
            throw new Api500Error("gagal mendapatkan produk", err);
          });

        const resData = {};
        resData.products = datas;
        resData.productsCount = count[0].productsCount;
        resData.maxPage = Math.ceil(+resData.productsCount / +data.pagLimit);
        if (+page !== +resData.maxPage) resData.nextPage = +page + 1;
        if (+page !== 1) resData.previousPage = +page - 1;

        responseData(response, OK, resData);
      } else {
        throw new Api404Error("Product not found");
      }
    } catch (err) {
      // ERROR HADLING TO MIDDLEWARE
      next(err);
    }
  },
  quickCheckStocksMdl: async function (response, getStatement, id, next) {
    try {
      // INJECT QUERY
      const data = await db.query(getStatement, id).catch((err) => {
        throw new Api500Error("Failed to get current stocks", err);
      });

      if (!data.length) {
        throw new Api404Error("Not found current stocks");
      }

      responseData(response, OK, data);
      // RESPONSE SUCCESS
    } catch (err) {
      // ERROR HANDLING TO MIDDLEWARE
      next(err);
    }
  },
};
