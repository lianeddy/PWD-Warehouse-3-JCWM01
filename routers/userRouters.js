const express = require("express");
const { userControllers } = require("../controllers");

const routers = express.Router();

routers.post("/login", userControllers.getData);
routers.post("/register", userControllers.addData);

module.exports = routers;
