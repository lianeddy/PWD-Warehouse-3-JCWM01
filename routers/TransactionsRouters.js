const express = require("express");
const { TransactionsController } = require("../controllers");
const route = express.Router();

route.post("/paymentProof", TransactionsController.addPaymentProof);
route.post("/checkout", TransactionsController.checkout);
route.get("/see-my-ongoing-transaction/:id", TransactionsController.seeOnGoingMyTransaction);



module.exports = route;
