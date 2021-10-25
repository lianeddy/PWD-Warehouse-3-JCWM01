const express = require("express");
const router = express.Router();
const { adminController } = require("../controller");

router.get("/product-list", adminController.productList);
router.get("/product-max-page", adminController.maxPage);
router.get("/data", adminController.adminData);
router.get("/warehouse", adminController.warehouse);

router.patch("/edit-product", adminController.editProduct);
router.patch("/edit-stock", adminController.editStock);

module.exports = router;
