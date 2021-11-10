const AppHistoryPersediaanProduk = require("./AppHistoryPersediaanProduk");
const AppPersediaanProduk = require("./AppPersediaanProduk");
const AppPermintaanProduk = require("./AppPermintaanProduk");
const AppTransaksiMasterProduk = require("./AppTransaksiMasterProduk");
const AppTransaksiMasterProdukDetail = require("./AppTransaksiMasterProdukDetail");
const AppMasterProduk = require("./AppMasterProduk");
const SysFile = require("./SysFile");
const SysAuthorization = require("./SysAuthorization");
const AppPropinsi = require("./AppPropinsi");
const AppKabkota = require("./AppKabkota");
const AppWarehouse = require("./AppWarehouse");
const SysUser = require("./SysUser");
const AppDataAlamatUser = require("./AppDataAlamatUser");

module.exports = {
  AppPropinsi,
  SysUser,
  SysAuthorization,
  AppDataAlamatUser,
  AppKabkota,
  SysFile,
  AppWarehouse,
  AppPermintaanProduk,
  AppTransaksiMasterProduk,
  AppMasterProduk,
  AppHistoryPersediaanProduk,
  AppPersediaanProduk,
  AppTransaksiMasterProdukDetail
};
