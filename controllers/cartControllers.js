const {
  insertProductToCartMdl,
  getCartMdl,
  deleteItemInCartMdl,
  editQtyItemInCartMdl,
} = require("../models/cartModels");

module.exports = {
  getCartUser: async (req, res, next) => {
    // data from client

    const data = {
      ...req.params.id_user,
    };

    // query sql
    const querySelectUser = "SELECT * FROM sys_user WHERE id_user = ?";
    const querySelectCart = `SELECT app_carts_produk.id_user, nm_master_produk, quantity, harga, app_carts_produk.quantity * app_master_produk.harga AS total_produk , URL FROM app_carts_produk INNER JOIN app_master_produk ON app_carts_produk.id_master_barang = app_master_produk.id_master_produk INNER JOIN sys_user ON app_carts_produk.id_user = sys_user.id_user WHERE app_carts_produk.id_user = ?`;
    // const querySelectCart = `SELECT app_carts_produk.id_user, nm_master_produk, quantity, harga, app_carts_produk.quantity * app_master_produk.harga AS total_produk , URL FROM ?? WHERE app_carts_produk.id_user = ?`

    // Pass into model
    getCartMdl(res, querySelectUser, querySelectCart, req.query.id_user, data);
  },

  addProductToCart: async (req, res, next) => {
    // data from client
    const data = {
      ...req.params,
      ...req.query,
    };

    // query sql
    const querySelect =
      "SELECT * FROM app_master_produk WHERE id_master_produk = ?";
    const queryAdd = "INSERT INTO app_carts_produk SET ?";

    // pass into a model
    insertProductToCartMdl(
      res,
      querySelect,
      queryAdd,
      req.params.id_master_barang,
      data
    );
  },

  deleteItemInCart: async (req, res, next) => {
    // query sql
    const querySelect =
      "SELECT * FROM app_carts_produk WHERE id_app_carts_produk = ?";
    const queryDelete =
      "DELETE FROM app_carts_produk WHERE id_app_carts_produk = ?";

    // Pass query into a model
    deleteItemInCartMdl(res, querySelect, queryDelete, req.params.id);
  },

  editQtyItemInCart: async (req, res, next) => {
    // Data From Client
    const data = {
      ...req.query,
    };

    // query sql
    const querySelect =
      "SELECT * FROM app_carts_produk WHERE id_app_carts_produk = ?";
    const queryEditQty =
      "UPDATE app_carts_produk SET ? WHERE id_app_carts_produk = ?";

    // Pass query into model
    editQtyItemInCartMdl(res, querySelect, queryEditQty, req.params.id, data);
  },
};
