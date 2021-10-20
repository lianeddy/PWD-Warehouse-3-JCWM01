const express = require("express");
const { AppPermintaanProdukController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD permintaan-barang user
routers.get("/", AppPermintaanProdukController.getData);
routers.post("/", AppPermintaanProdukController.addData);
routers.patch("/:id", AppPermintaanProdukController.updateData);
routers.delete("/:id", AppPermintaanProdukController.deleteData);

module.exports = routers;
