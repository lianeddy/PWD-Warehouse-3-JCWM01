const express = require("express");
const { productControllers } = require("../controllers");

const routers = express.Router();

// endpoint product
routers.get("/", productControllers.getData);

module.exports = routers;
