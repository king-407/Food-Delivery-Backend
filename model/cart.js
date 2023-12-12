const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  productInfo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "CartItem",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Cart", cartSchema);
