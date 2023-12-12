const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
