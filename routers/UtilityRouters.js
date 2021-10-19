const express = require("express");
const {
  AppPropinsiController,
  AppKabkotaController,
} = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();
// Endpoint filter provinsi
routers.get("/filter-provinsi", AppPropinsiController.getData);
// Endpoint filter kabupaten / kota
routers.get("/filter-kabkota", AppKabkotaController.getData);

module.exports = routers;
