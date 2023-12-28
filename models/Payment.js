const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: [true, "Please provide payment amount"],
    },
    date:{
        type: String,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    supplier: {
        type: mongoose.Types.ObjectId,
        ref: "Supplier",
        required: true,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);