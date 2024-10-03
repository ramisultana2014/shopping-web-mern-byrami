const express = require("express");
const authController = require("../../controllers/authController");
const orderController = require("../../controllers/orderController");
const router = express.Router();
router.use(authController.prtotectedRouter);
router.post("/createOrder", orderController.createOrder);
router.get(
  "/allOrdersByAdmin",
  authController.restrictTo,
  orderController.getAllOrdersByAdmin
);
router.get(
  "/getOneOrderByAdmin/:id",
  authController.restrictTo,
  orderController.getOneOrderByAdmin
);
router
  .route("/:id")
  .get(orderController.getOneOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
