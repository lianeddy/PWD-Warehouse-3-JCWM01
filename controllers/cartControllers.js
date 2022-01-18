const {
  insertProductToCartMdl
} = require('../models/cartModels')

module.exports = {
  addProductToCart: async (req, res, next) => {
    // data from client
    const data = {
      ...req.params,
      ...req.query
    }

    console.log(data);
    // query sql
    const querySql = 'INSERT INTO app_carts_produk SET ?'

    // pass into a model
    insertProductToCartMdl(res, querySql, data)
  },
};