const userRouters = require("./userRouters");
const UtilityRouters = require("./UtilityRouters");
const AppPermintaanProdukRouter = require("./AppPermintaanProdukRouter");
const AppHistoryPersediaanProdukRouter = require("./AppHistoryPersediaanProdukRouter");
const productRouters = require("./productRouters");
const uploadProductRouter = require("./uploadProductRouter");
const TransactionsRouters = require("./TransactionsRouters");
const AppPersediaanProdukRouter = require("./AppPersediaanProdukRouter");
const AppTransaksiProdukRouter = require("./AppTransaksiProdukRouter");
const cartRouters = require('./cartRouters')

module.exports = {
  userRouters,
  UtilityRouters,
  AppPermintaanProdukRouter,
  AppHistoryPersediaanProdukRouter,
  productRouters,
  uploadProductRouter,
  TransactionsRouters,
  AppPersediaanProdukRouter,
  AppTransaksiProdukRouter,
  cartRouters
};