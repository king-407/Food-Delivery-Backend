const express = require("express");
const { addProduct } = require("../controller/productController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const router = express.Router();

router.post("/add", auth, isAdmin, addProduct);

module.exports = router;
