import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  description: String,
}, { timestamps: true });

export default mongoose.model("Stock", stockSchema);
