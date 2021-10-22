const { db } = require("../helpers/index");

module.exports = {
  getData: (req, res) => {},
  addData: (req, res) => {
    let { id_user, id_master_produk, quantity } = req.body;
    let scriptQuery = `Insert into app_carts_transaksi_produk (id_master_produk, id_user, quantity)`;
  },
};
