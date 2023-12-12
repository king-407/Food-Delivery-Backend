const mongoose = require("momgoose");
const orderSchema = mongoose.Schema({
  Info: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  totalPrice: Number,
});
module.exports = mongoose.model("Order", orderSchema);
