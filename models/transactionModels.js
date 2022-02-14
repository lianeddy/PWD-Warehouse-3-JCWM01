"use strict";

const { db, RajaOngkirHelper } = require("../helpers");
const { Api404Error, Api500Error } = require("../utils/Error");
const { OK, BAD_REQUEST, NOT_FOUND } = require("../utils/httpStatusCodes");

const {
  responseData,
  responError,
  responseMessage,
} = require("../utils/response-handler");

module.exports = {
  checkoutMdl: async function (
    response,
    updateStatement,
    // addStatementDetailTransactions,
    addStatementCheckout,
    // dataDetailTransactions,
    dataCheckout,
    id_user
  ) {
    try {
      // update cart
      const updateCartIsCheckout = await db
        .query(updateStatement, id_user)
        .catch((err) => {
          throw new Api500Error("Gagal mengubah cart", err);
        });

      // insert to detailTransactions
      // const insertDetailTransactions = await db
      //   .query(addStatementDetailTransactions, [dataDetailTransactions])
      //   .catch((err) => {
      //     throw new Api500Error(
      //       "Gagal menambahkan data detail transactions",
      //       err
      //     );
      //   });

      // insert to checkout
      const insertCheckot = await db
        .query(addStatementCheckout, [dataCheckout])
        .catch((err) => {
          throw {
            message: "Gagal melakukan checkout",
            status: 500,
            error: err,
          };
        });

      console.log(insertCheckot);

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
  getMinCostShippingMdl: async function (
    response,
    getStatementAddress,
    getStatementWh,
    getStatementWarehouseOrigin,
    id_user,
    courierProvider,
    next
  ) {
    try {
      // get idKabKota for destination
      const getDefaultAdress = await db
        .query(getStatementAddress, id_user)
        .catch((err) => {
          throw new Api500Error("Gagal mendapatkan default adress", err);
        });

      const idKabKotaUser = getDefaultAdress[0].id_kabkota;

      // get idKabKota warehouses for origin
      const getIdKabKota = await db.query(getStatementWh).catch((err) => {
        throw new Api500Error("Gagal mendapatkan idKabKota", err);
      });

      // Pass to 3rd API for Data Shipping
      const minOngkir = await Promise.all(
        getIdKabKota.map(
          async (value) =>
            await RajaOngkirHelper.getCost(
              value.id_kabkota,
              idKabKotaUser,
              1000,
              courierProvider
            )
        )
      );

      // min cost shipping
      const minCostShipping = Math.min(
        ...minOngkir.map((cost) => cost.results[0].costs[0].cost[0].value)
      );

      // data shipping with min cost
      let result = minOngkir.filter(
        (data) => data.results[0].costs[0].cost[0].value === minCostShipping
      );

      const idKabKotaOrigin = result[0].query.origin;

      // get id_warehouse origin
      const getWhOrigin = await db
        .query(getStatementWarehouseOrigin, idKabKotaOrigin)
        .catch((err) => {
          throw new Api500Error("gagal mendapatkan data id_warehouse", err);
        });

      // data to client
      const data = {};
      data.minCost = minCostShipping;
      data.id_warehouse_origin = getWhOrigin[0].id_warehouse;
      data.shipping_service = result[0].results[0].costs;
      responseData(response, OK, [data]);
    } catch (err) {
      next(err);
    }
  },
};
