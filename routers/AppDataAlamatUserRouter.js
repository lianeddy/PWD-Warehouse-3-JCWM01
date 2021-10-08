const express = require("express");
const { AppDataAlamatUserController } = require("../controllers");
const routers = express.Router();

// Endpoint CRUD multi-address user
routers.get("/multi-address", AppDataAlamatUserController.getData);
routers.post("/multi-address", AppDataAlamatUserController.addData);
routers.patch("/multi-address", AppDataAlamatUserController.updateData);
routers.delete("/multi-address", AppDataAlamatUserController.deleteData);

module.exports = routers;
