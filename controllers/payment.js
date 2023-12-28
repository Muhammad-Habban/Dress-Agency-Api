const {StatusCodes} = require("http-status-codes");

const Payment = require("../models/Payment");
const Product = require("../models/Product")

const getPayments = async(req, res) => {
    const payments = await Payment.find({}).populate("supplier").populate("product");
    console.log(payments);
    console.log("Inside");
    return res.status(StatusCodes.OK).json({total: payments.length, payments});
}

const addPayment = async(req, res) => {
    const {amount, date, supplierId, sku} = req.body;
    if(!amount || !date || !supplierId || !sku)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Please Provide all the details"});
    }
    const prod = await Product.findOne({sku});
    if(!prod)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "No product with respective Id found"});
    }
    if(prod.paid)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message : "Product payment has already been paid"});
    }
    const newPayment = await Payment.create({
        amount,
        date,
        product: prod._id,
        supplier: supplierId,
    });
    prod.paid = true;
    await prod.save();
    return res
        .status(StatusCodes.OK)
        .json({ newPayment, message: "Payment successful" });
}

module.exports = {getPayments, addPayment};