const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helpers");

const routers = express.Router();

routers.post("/login", userControllers.getData);
routers.post("/register", userControllers.addData);
routers.patch("/verified", auth, userControllers.verification);
routers.patch("/change-password", userControllers.changePassword);
routers.post("/forgot-password", userControllers.forgotPassword);
routers.patch(
  "/forgot-password-update",
  auth,
  userControllers.forgotPasswordUpdate
);

module.exports = routers;
