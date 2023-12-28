const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide supplier name"],
    },
    contact: {
        type: String,
        required: [true, "Please provide contact details"],
    },
});

module.exports = mongoose.model("Supplier", SupplierSchema);
