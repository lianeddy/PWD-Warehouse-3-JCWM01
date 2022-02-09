"use strict";

const { db } = require("../helpers");
const { Api404Error, Api500Error } = require("../utils/Error");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../utils/httpStatusCodes");

const {
  responseData,
  responError,
  responseMessage,
} = require("../utils/response-handler");

module.exports = {
  checkoutMdl: async function (response, addStatement, data) {
    try {
      // insert to database
      const insertCheckotToDatabase = await db
        .query(addStatement, [data])
        .catch((err) => {
          throw {
            message: "Gagal melakukan checkout",
            status: 500,
            error: err,
          };
        });

      responseMessage(response, 201, "Berhasil melakukan checkout");
    } catch (err) {
      responError(response, err.status, err);
    }
  },
  seeOnGoingTransactionMdl: async function (response, getStatement, id) {
    try {
      const column = [
        "invoice_code",
        "keterangan",
        "alamat",
        "total_harga",
        "is_tolak",
        "is_bayar",
        "is_verify",
        "ongkos_kirim",
        "app_metode_pengiriman.nm_metode_pengiriman",
        "app_metode_pembayaran.nm_metode_pembayaran",
      ];
      // inject to database
      const getData = await db
        .query(getStatement, [column, id])
        .catch((err) => {
          throw {
            message: "Gagal memuat status transaksi Anda",
            status: 500,
            error: err,
          };
        });

      if (getData.length) {
        responseData(response, 200, getData);
      } else {
        throw {
          message: "Transaksi Anda tidak ditemukan",
          status: 404,
        };
      }
    } catch (err) {
      responError(response, err.status, err);
    }
  },
  generatedOngkirMdl: async function (response, data) {
    try {
      if (!data) {
        throw {
          message: "Gagal memuat ongkir",
          status: 400,
        };
      }

      responseData(response, 200, data);
    } catch (err) {
      responError(response, err.status, err);
    }
  },
  getShippingMethodMdl: async function (response, getStatement, next) {
    try {
      const data = await db.query(getStatement).catch((err) => {
        throw new Api500Error("gagal mendapatkan shipping method", err);
      });

      responseData(response, OK, data);
    } catch (err) {
      // Pass to centralize error handling
      next(err);
    }
  },
  getPaymentMethodMdl: async function (response, getStatment, next) {
    const columns = [
      "id_metode_pembayaran",
      "app_metode_pembayaran.id_category_metode_pembayaran",
      "nm_metode_pembayaran",
      "nm_category_metode_pembayaran",
    ];

    try {
      const data = await db.query(getStatment, [columns]).catch((err) => {
        throw new Api500Error("gagal mendapatkan shipping method", err);
      });

      responseData(response, OK, data);
    } catch (err) {
      next(err);
    }
  },
};
