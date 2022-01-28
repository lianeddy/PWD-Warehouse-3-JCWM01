"use strict";
const { db } = require("../helpers");
const Api500Error = require("../utils/api500Error");
const Api404Error = require("../utils/api404Error");

const {
  responseData,
  responError,
  responseMessage,
} = require("../utils/response-handler");

module.exports = {
  getCartMdl: async function (
    response,
    searchStatement,
    getStatement,
    id,
    data
  ) {
    try {
      // column
      // Inject to sql: check if user in database
      const searchUser = await db.query(searchStatement, id).catch((err) => {
        throw {
          message: "Gagal menemukan user",
          error: err,
          status: 500,
        };
      });

      // const columnCart = ['app_carts_produk.id_user', 'nm_master_produk', 'quantity', 'harga', "URL", 'app_carts_produk.quantity * app_master_produk.harga AS total_produk']
      const table = [
        "app_carts_produk INNER JOIN app_master_produk ON app_carts_produk.id_master_barang = app_master_produk.id_master_produk INNER JOIN sys_user ON app_carts_produk.id_user = sys_user.id_user",
        id,
      ];
      if (searchUser.length) {
        const carts = await db.query(getStatement, id).catch((err) => {
          throw {
            message: "Gagal menemukan cart",
            error: err,
            status: 500,
          };
        });

        responseData(response, 200, carts);
      } else {
        throw {
          message: "user not found",
          status: 404,
        };
      }
    } catch (err) {
      response.status(err.status).send(err);
    }
  },

  insertProductToCartMdl: async function (
    response,
    searchStatement,
    addStatement,
    id,
    data
  ) {
    try {
      // Inject to sql: check if product in database
      const searchData = await db.query(searchStatement, id).catch((err) => {
        throw {
          message: "Gagal menemukan produk",
          error: err,
          status: 500,
        };
      });

      console.log(searchData);

      // Inject to sql: insert product
      if (searchData.length) {
        const insertData = await db.query(addStatement, [data]).catch((err) => {
          throw {
            message: "Gagal menambahkan ke keranjang",
            error: err,
            status: 500,
          };
        });

        // respon success
        responseMessage(
          response,
          201,
          "Berhasil menambahkan ke dalam keranjang"
        );
      } else {
        throw {
          message: "Data tidak ditemukkan",
          status: 404,
          succes: false,
        };
      }
    } catch (err) {
      responError(response, err.status, err);
    }
  },

  deleteItemInCartMdl: async function (
    response,
    searchStatement,
    deleteStatement,
    id
  ) {
    // Check if product exists in cart
    try {
      const searchData = await db.query(searchStatement, id).catch((err) => {
        throw {
          message: "gagal menemukan item di cart",
          status: 500,
          error: err,
        };
      });

      // Product exists in cart
      if (searchData.length) {
        const deleteData = await db.query(deleteStatement, id).catch((err) => {
          throw {
            message: "gagal menghapus item di cart",
            status: 500,
            error: err,
          };
        });

        // Respon Delete Success
        responseMessage(response, 200, "Sukses menghapus item pada cart Anda");
      } else {
        throw {
          message: "item tidak ditemukan di cart",
          status: 404,
        };
      }
    } catch (err) {
      responError(response, err.status, err);
    }
  },

  editQtyItemInCartMdl: async function (
    response,
    searchStatement,
    editStatement,
    id,
    data
  ) {
    try {
      // find item in cart
      const searchData = await db.query(searchStatement, id).catch((err) => {
        throw {
          message: "gagal menemukan item di cart",
          status: 500,
          error: err,
        };
      });

      // Check item exists
      if (searchData.length) {
        const editQtyInData = await db
          .query(editStatement, [data, id])
          .catch((err) => {
            throw {
              message: "gagal mengubah quantity item di cart",
              status: 500,
              error: err,
            };
          });
        // Edit response exists 200
        responseMessage(response, 200, "Sukses mengubah qty item");
      } else {
        // Id cart not exists in cart database 404
        throw {
          message: "item tidak ditemukan di cart",
          status: 404,
        };
      }
    } catch (err) {
      // error response any status code
      responError(response, err.status, err);
    }
  },
};
