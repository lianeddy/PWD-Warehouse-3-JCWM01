const userControllers = require("./userControllers");
const AppPropinsiController = require("./AppPropinsiController");
const AppKabkotaController = require("./AppKabkotaController");
const AppDataAlamatUserController = require("./AppDataAlamatUserController");
const UserImageController = require("./UserImageController");
const SysUserController = require("./SysUserController");
const AppWarehouseController = require("./AppWarehouseController");
const AppMasterProdukController = require("./AppMasterProdukController");
const AppPermintaanProdukController = require("./AppPermintaanProdukController");
const AppHistoryPersediaanProdukController = require("./AppHistoryPersediaanProdukController");
const productControllers = require("./productControllers");
const productImageController = require("./productImageController");

module.exports = {
  userControllers,
  AppDataAlamatUserController,
  AppPropinsiController,
  AppKabkotaController,
  UserImageController,
  SysUserController,
  AppWarehouseController,
  AppPermintaanProdukController,
  AppMasterProdukController,
  AppHistoryPersediaanProdukController,
  productControllers,
  productImageController,
};
