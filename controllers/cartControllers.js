const {
  insertProductToCartMdl
} = require('../models/cartModels')

module.exports = {
  addProductToCart: async (req, res, next) => {
    console.log(req.params.id_master_barang);
    // data from client
    const data = {
      ...req.params,
      ...req.query
    }

    // query sql
    const querySelect = 'SELECT * FROM app_master_produk WHERE id_master_produk = ?'
    const queryAdd = 'INSERT INTO app_carts_produk SET ?'

    // pass into a model
    insertProductToCartMdl(res, querySelect, queryAdd, req.params.id_master_barang, data)
  },
};