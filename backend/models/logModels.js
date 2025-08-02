import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true }, 
  details: { type: String }, 
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("History", historySchema);
