const express = require("express");
const { TransactionsController } = require("../controllers");
const route = express.Router();

route.post("/paymentProof", TransactionsController.addPaymentProof);

module.exports = route;
