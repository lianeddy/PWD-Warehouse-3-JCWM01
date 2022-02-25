const express = require("express");
const { TransactionsController } = require("../controllers");
const route = express.Router();
const { auth } = require("../helpers");

route.post("/paymentProof", TransactionsController.addPaymentProof);
route.post("/checkout", auth, TransactionsController.checkout);
route.get(
  "/see-my-ongoing-transaction/:id",
  auth,
  TransactionsController.seeOnGoingMyTransaction
);
route.get("/ongkir", TransactionsController.generatedOngkir);
route.get("/get-shipping-method", TransactionsController.getShippingMethod);
route.get("/get-payment-method", TransactionsController.getPaymentMethods);
route.get("/min-cost-shipping", TransactionsController.getMinCostShipping);

module.exports = route;
