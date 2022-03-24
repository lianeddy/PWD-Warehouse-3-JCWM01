const express = require("express");
const { User } = require("../controllers");

const routers = express.Router();

routers.post("/login", User.login);

module.exports = routers;
