const express = require("express");
const { productControllers } = require("../controllers");

const routers = express.Router();

// endpoint product
routers.get("/", productControllers.getData);
routers.get("/:id_master_produk", productControllers.getDataById);

module.exports = routers;
