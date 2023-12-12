const Cart = require("../model/cart");
const Order = require("../model/order");
const placeOrder = async (req, res, next) => {
  const { cartId } = req.body;
  try {
    const cart = await Cart.findOne({ owner: req.user.userId }).populate({
      path: "productInfo",
      populate: {
        path: "item",
        model: "Product",
      },
    });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found for the user" });
    }

    const totalPrice = cart.productInfo.reduce((total, product) => {
      return total + product.item.cost * product.quantity;
    }, 0);
    const order = new Order({
      totalPrice,
      Info: cartId,
      owner: req.user.userId,
    });
    await order.save();
    return res.status(200).send(order);
  } catch (e) {
    console.log(e);
  }
};
module.exports = { placeOrder };
