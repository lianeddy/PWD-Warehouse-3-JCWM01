const express = require("express");
const { AppPersediaanProdukController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD permintaan-barang user
routers.get("/", AppPersediaanProdukController.getData);
routers.post("/", AppPersediaanProdukController.addData);
routers.patch("/:id", AppPersediaanProdukController.updateData);
routers.delete("/:id", AppPersediaanProdukController.deleteData);

module.exports = routers;
