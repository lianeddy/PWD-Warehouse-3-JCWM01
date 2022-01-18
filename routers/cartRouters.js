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

module.exports = routers