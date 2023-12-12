const Product = require("../model/product");
const addProduct = async (req, res, next) => {
  try {
    const { restaurant, category, name, cost } = req.body;
    if (!restaurant || !category || !name) {
      return next("Please provide all the information");
    }
    const product = new Product({
      restaurant,
      category,
      name,
      cost,
    });
    await product.save();
    res.status(200).send(product);
  } catch (e) {}
};

module.exports = { addProduct };
