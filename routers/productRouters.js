const express = require("express");
const { productControllers } = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();

// endpoint product
routers.get("/", productControllers.getData);
routers.get("/search-product", productControllers.searchProduct);
routers.get("/get-product-filter", productControllers.getProductsByFilter);
routers.get("/product-admin", productControllers.getDataAdmin);
routers.get("/check-stok", productControllers.checkStokProduct);
routers.get("/:id_master_produk", productControllers.getDataById);

module.exports = routers;
