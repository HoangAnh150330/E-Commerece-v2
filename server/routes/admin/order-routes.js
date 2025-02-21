const express = require("express");
const { createVNPayPayment, vnpayReturn } = require("../../controllers/shop/vnpay-controller");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
router.post("/create-vnpay-payment", createVNPayPayment);
router.get("/vnpay-return", vnpayReturn);
module.exports = router;
