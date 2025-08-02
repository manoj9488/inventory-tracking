import Stock from "../models/stocksModel.js";
import User from "../models/registrationModel.js";


export const createStock = async (req, res) => {
  const { itemName, quantity, unit, description } = req.body;
  const stock = new Stock({ itemName, quantity, unit, description, addedBy: req.user._id });
  await stock.save();
  res.status(201).json(stock);
};


export const getAllStocks = async (req, res) => {
  const stocks = await Stock.find().populate('addedBy', 'name role');
  res.json(stocks);
};


export const updateStock = async (req, res) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id,
     req.body, 
     { new: true });

  res.json(stock);
};


export const deleteStock = async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.json({ message: "Stock deleted" });
};


export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  res.json(users);
};
