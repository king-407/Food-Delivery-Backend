const Cart = require("../model/cart");
const placeOrder = async (req, res, next) => {
  const { cartId } = req.body;
  try {
    const cart = await Cart.findOne({ _id: cartId }).populate("productInfo");
    if (!cart) {
      return res.status(400).json({ message: "Cart not found for the user" });
    }
    const totalPrice = cart.productInfo.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);
    console.log(totalPrice);
  } catch (e) {}
};
module.exports = { placeOrder };
