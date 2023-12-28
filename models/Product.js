const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "Please provide product SKU"],
    },
    name: {
      type: String,
      minlength: 3,
      required: [true, "Please provide product name"],
    },

    color: {
      type: String,
      required: [true, "Please provide product color"],
    },
    type: {
      type: String,
      required: [true, "Please provide product type"],
    },
    size: {
      type: String,
      required: [true, "Please provide product size"],
    },
    price:{
      type: Number,
      required: [true, "Please provide product price"]
    },
    supplier: {
      type: mongoose.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    paid:{
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
