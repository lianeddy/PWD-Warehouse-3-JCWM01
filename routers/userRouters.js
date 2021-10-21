const express = require("express");
const {
  userControllers,
  AppDataAlamatUserController,
  UserImageController,
  AppWarehouseController,
} = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();

routers.post("/login", userControllers.getData);
routers.post("/register", userControllers.addData);
routers.patch("/verified", auth, userControllers.verification);
routers.patch("/change-password", userControllers.changePassword);
routers.post("/keep-login", auth, userControllers.keepLogin);
// routers.patch("/forgot-password", userControllers.forgotPassword);

// Endpoint CRUD multi-address user
routers.get("/multi-address", AppDataAlamatUserController.getData);
routers.post("/multi-address", AppDataAlamatUserController.addData);
routers.patch("/multi-address/:id", AppDataAlamatUserController.updateData);
routers.patch(
  "/multi-address/many-data/:id",
  AppDataAlamatUserController.updateManyDataByIdUser
);
routers.delete("/multi-address/:id", AppDataAlamatUserController.deleteData);
// routers.get("/multi-address/filter-provinsi", AppPropinsiController.getData);
// routers.get("/multi-address/filter-kabkota", AppKabkotaController.getData);

// Profile Image
routers.post("/profile-image", UserImageController.addData);
routers.patch("/profile-image/:id", UserImageController.updateData);

// Warehouse
routers.get("/warehouse", AppWarehouseController.getData);
routers.post("/warehouse", AppWarehouseController.addData);
routers.patch("/warehouse", AppWarehouseController.updateData);
routers.delete("/warehouse", AppWarehouseController.deleteData);

module.exports = routers;
