const express = require("express");
const db = require("./mongoose");
const bodyParser = require("body-parser");
const cartController = require("./router/cartRouter");
const userRouter = require("./router/userRouter");
const productController = require("./router/productRouter");
const orderController = require("./router/orderRouter");
const app = express();

const startServer = async () => {
  try {
    await db();
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/product", productController);
app.use("/cart", cartController);
app.use("/order", orderController);
app.use((err, req, res, next) => {
  return res.status(500).json({ err });
});
app.listen(3000, (req, res) => {
  console.log("server is running");
});
