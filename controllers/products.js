const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("supplier");
  res
    .status(StatusCodes.OK)
    .json({ total: products.length, products, user: req.user });
};
const getSingleProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product with the ID: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  const { sku, name, color, type, size, price, supplierName, contact } = req.body;
  if (!sku || !name || !color || !type || !size || !price || !supplierName) {
    throw new BadRequestError("Please provide all product details");
  }

  // Checking the Sku already exists or not
  const isSkuExists = await Product.findOne({ sku });
  if (isSkuExists) {
    throw new BadRequestError(`Product already exists with this ID: ${sku}`);
  }

  const supp = await Supplier.findOne({name: supplierName});
  if(supp)
  {
    const product = await Product.create({ sku, name, color, type, size, price, supplier: supp._id });
    return res.status(StatusCodes.OK).json({ product });
  }
  // if supplier does not exist
  const newSupplier = await Supplier.create({name: supplierName, contact});
  const newProduct = await Product.create({ sku, name, color, type, size, price, supplier: newSupplier._id });
  return res.status(StatusCodes.OK).json({ newProduct });
};

const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const { sku, name, color, type, size, price, paid } = req.body;
  if (!sku || !name) {
    throw new NotFoundError("Please provide product SKU & product name");
  }
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with ID: ${productID}`);
  }
  product.sku = sku;
  product.name = name;
  product.color = color;
  product.type = type;
  product.size = size;
  product.price = price;
  product.paid = paid;
  await product.save();
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  console.log("hi");
  const { productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with ID: ${productID}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
