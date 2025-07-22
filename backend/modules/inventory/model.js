const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name:{ type: String, required: true },
    suk:{ type: String, required: true },
    qty:{ type: Number, required: true },
    price:{ type: Number, required: true },
    image:{ type: String, required: true },
    category:{ type: String, required: true },
    subcategory:{ type: String, required: true },
},{timestamps:true})

module.exports = mongoose.model("inventory", inventorySchema);