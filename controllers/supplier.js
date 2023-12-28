const {StatusCodes, StatusCode} = require("http-status-codes");
const Supplier = require("../models/Supplier");
const History = require("../models/History");
const Payment = require("../models/Payment");

// const addSupplier = async(req, res)=>{
//     const {name, contact, sku} = req.body;
//     if(!name || !contact || !sku)
//     {
//         return res.status(StatusCodes.BAD_REQUEST)
//             .json({ message: "Please enter all values" });
//     }
//     try {
//         let supp = await Supplier.findOne({ name });
//
//         if (supp) {
//             await Supplier.updateOne(
//                 { _id: supp._id },
//                 { $push: { products: sku } }
//             );
//             return res.status(StatusCodes.OK)
//                 .json({ message: "Product added to supplier successfully" });
//         } else {
//             const newSupplier = await Supplier.create({ name, contact, products: [sku] });
//             return res.status(StatusCodes.CREATED)
//                 .json({ message: "New supplier created", supplier: newSupplier });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ message: "An error occurred" });
//     }
// }

const getSuppliers = async(req, res) => {
    const suppliers = await Supplier.find({});
    return res.status(StatusCodes.OK).json({total: suppliers.length, suppliers});
}

module.exports = {getSuppliers};