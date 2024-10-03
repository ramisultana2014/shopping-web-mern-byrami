const express = require("express");
const productController = require("../../controllers/productContrloller");
const authController = require("../../controllers/authController");
const router = express.Router();
router.use(authController.prtotectedRouter);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(authController.restrictTo, productController.createProduct);
router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(authController.restrictTo, productController.updateProduct)
  .delete(authController.restrictTo, productController.deleteProduct);

module.exports = router;
