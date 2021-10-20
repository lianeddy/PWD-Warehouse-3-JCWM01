const express = require("express");
const { AppHistoryPersediaanProdukController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD permintaan-barang user
routers.get("/", AppHistoryPersediaanProdukController.getData);
routers.get("/list", AppHistoryPersediaanProdukController.listData);
routers.post("/", AppHistoryPersediaanProdukController.addData);
routers.patch("/", AppHistoryPersediaanProdukController.updateData);
routers.delete("/", AppHistoryPersediaanProdukController.deleteData);

module.exports = routers;
