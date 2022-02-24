const express = require("express");
const { productImageController } = require("../controllers");
const route = express.Router();

route.post("/uploadProduct", productImageController.addData);
route.post("/uploadCover", productImageController.addImgLanding);

module.exports = route;
