const CartItem = require("../model/cartItem");
const Cart = require("../model/cart");
const addItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const itemCart = new CartItem({
      item: productId,
      quantity,
    });
    await itemCart.save();
    let cart = await Cart.findOne({ owner: req.user.userId });
    if (!cart) {
      cart = new Cart({
        owner: req.user.userId,
        productInfo: [itemCart._id],
      });
    } else {
      cart.productInfo.push(itemCart._id);
    }
    await cart.save();
    return res.status(200).send(cart);
  } catch (e) {
    console.log(e);
  }
};
const viewCart = async (req, res, next) => {
  try {
    const products = await Cart.findOne({ owner: req.user.userId }).populate({
      path: "productInfo",
      populate: {
        path: "item",
        model: "Product",
      },
    });
    if (products) return res.status(200).send(products);
    else return next("You have no item in the cart");
  } catch (e) {
    console.log(e);
    next("An error occured");
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ owner: req.user.userId });

    if (!cart) {
      next("No cart found for you");
    }

    // Find the index of the item in the productInfo array
    const itemIndex = cart.productInfo.findIndex(
      (item) => String(item._id) === String(itemId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Remove the item from the productInfo array
    cart.productInfo.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Item removed from the cart" });
  } catch (error) {
    console.error(error);
    next("Server error");
  }
};

module.exports = { addItem, viewCart, removeFromCart };
