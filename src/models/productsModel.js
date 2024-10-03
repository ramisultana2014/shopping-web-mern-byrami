const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "each product must have unigue number"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "each product must have unigue title"],
    unique: true,
    maxlength: [50, "A product name must have less or equal 50 characters"],
    minlength: [5, "A product name must have more or equal 5 characters"],
  },
  price: {
    type: Number,
    required: [true, "product must have price"],
  },
  image: {
    type: String,
    required: [true, "A product must have a image"],
  },
  description: String,
  quantity: {
    type: Number,
    required: [true, "A product must have quantity"],
  },
  category: {
    type: String,
    required: [true, "A product must have category"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
