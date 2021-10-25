const express = require("express");
const { AppTransaksiMasterProdukController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD permintaan-barang user
routers.get("/", AppTransaksiMasterProdukController.getData);
routers.get("/list", AppTransaksiMasterProdukController.listData);
routers.get("/detail/:id", AppTransaksiMasterProdukController.listData);
routers.post("/:id", AppTransaksiMasterProdukController.addData);
routers.patch("/:id", AppTransaksiMasterProdukController.updateData);
routers.delete("/:id", AppTransaksiMasterProdukController.deleteData);

module.exports = routers;
