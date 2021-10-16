const express = require("express");
const { productImageController } = require("../controllers");
const route = express.Router();

route.post("/uploadProduct", productImageController.addData);

module.exports = route;
