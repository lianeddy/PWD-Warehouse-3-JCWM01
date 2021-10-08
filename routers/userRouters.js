const express = require("express");
const {
  userControllers,
  AppDataAlamatUserController,
  AppPropinsiController,
  AppKabkotaController,
  // UserImageController,
} = require("../controllers");

const routers = express.Router();

routers.post("/login", userControllers.getData);

// Endpoint CRUD multi-address user
routers.get("/multi-address", AppDataAlamatUserController.getData);
routers.post("/multi-address", AppDataAlamatUserController.addData);
routers.patch("/multi-address/:id", AppDataAlamatUserController.updateData);
routers.delete("/multi-address/:id", AppDataAlamatUserController.deleteData);
routers.get("/multi-address/filter-provinsi", AppPropinsiController.getData);
routers.get("/multi-address/filter-kabkota", AppKabkotaController.getData);

// Profile Image
// routers.post("/profile-image", UserImageController.addData);
// routers.patch("/profile-image/:id", UserImageController.updateData);

module.exports = routers;
