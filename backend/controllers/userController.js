import Stock from "../models/stocksModel.js";
import User from "../models/registrationModel.js";

export const getStocks = async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

export async function getAllUsers (req, res)  {
  const users = await User.find();
  res.json(users);
};