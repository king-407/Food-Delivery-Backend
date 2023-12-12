const express = require("express");

const { placeOrder } = require("../controller/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/order", auth, placeOrder);

module.exports = router;
