const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();

routers.post("/login", userControllers.getData);
routers.post("/register", userControllers.addData);
routers.patch("/verified", auth, userControllers.verification);
routers.patch("/change-password", userControllers.changePassword);
// routers.patch("/forgot-password", userControllers.forgotPassword);

module.exports = routers;
