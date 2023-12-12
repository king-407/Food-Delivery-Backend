const express = require("express");
const {
  addItem,
  viewCart,
  removeFromCart,
} = require("../controller/cartController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/addItem", auth, addItem);
router.get("/viewCart", auth, viewCart);
router.delete("/removeFromCart/:itemId", auth, removeFromCart);
module.exports = router;
