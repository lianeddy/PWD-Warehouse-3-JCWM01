const express = require("express");
const { cartContollers } = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();

// Endpoint cart routers
routers.post(
  "/add-to-cart/:id_master_barang",
  auth,
  cartContollers.addProductToCart
);
routers.get("/get-my-cart", auth, cartContollers.getCartUser);
routers.delete(
  "/delete-item-in-cart/:id",
  auth,
  cartContollers.deleteItemInCart
);
routers.patch(
  "/edit-Qtyitem-in-cart/:id",
  auth,
  cartContollers.editQtyItemInCart
);
routers.post("/add-from-product-list/:id", auth, cartContollers.addToCart);

module.exports = routers;
