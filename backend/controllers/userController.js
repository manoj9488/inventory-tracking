import Stock from "../models/stocksModel.js";

export const getStocks = async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};
