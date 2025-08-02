import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  unit: String,
  description: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Stock", stockSchema);
