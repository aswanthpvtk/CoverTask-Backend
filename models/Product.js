const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    returnPrice: { type: Number,},
    dateAdded: { type: String} // ✅ Store as "YYYY-MM-DD"
});

module.exports = mongoose.model("Coverss", productSchema);
