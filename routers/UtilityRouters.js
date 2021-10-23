const express = require("express");
const {
  AppPropinsiController,
  AppKabkotaController,
  AppMasterProdukController,
  AppWarehouseController,
} = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();
// Endpoint filter provinsi
routers.get("/filter-provinsi", AppPropinsiController.getData);
// Endpoint filter kabupaten / kota
routers.get("/filter-kabkota", AppKabkotaController.getData);
// Endpoint filter warehouse
routers.get("/filter-warehouse", AppWarehouseController.getData);
// Endpoint filter master produk
routers.get("/filter-masterproduk", AppMasterProdukController.getData);

module.exports = routers;
