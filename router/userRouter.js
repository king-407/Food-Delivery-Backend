const express = require("express");
const { signup, loginController } = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginController);
module.exports = router;
