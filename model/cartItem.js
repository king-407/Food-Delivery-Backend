const mongoose = require("mongoose");
const cartItemSchema = mongoose.Schema({
  item: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("CartItem", cartItemSchema);
