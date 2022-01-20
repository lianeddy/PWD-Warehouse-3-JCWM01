const express = require('express')
const {
    cartContollers
} = require('../controllers')
const {
    auth
} = require('../helpers')


const routers = express.Router()

// Endpoint cart routers
routers.post("/add-to-cart/:id_master_barang", cartContollers.addProductToCart)
routers.get("/get-my-cart", cartContollers.getCartUser)
routers.delete("/delete-item-in-cart/:id", cartContollers.deleteItemInCart)
routers.patch("/edit-Qtyitem-in-cart/:id", cartContollers.editQtyItemInCart)


module.exports = routers