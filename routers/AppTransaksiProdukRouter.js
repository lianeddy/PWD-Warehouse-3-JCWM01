const express = require("express");
const { AppTransaksiMasterProdukController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD permintaan-barang user
routers.get("/", AppTransaksiMasterProdukController.getData);
routers.get("/list", AppTransaksiMasterProdukController.listData);
routers.post("/", AppTransaksiMasterProdukController.addData);
routers.patch("/", AppTransaksiMasterProdukController.updateData);
routers.delete("/", AppTransaksiMasterProdukController.deleteData);

module.exports = routers;
