import Stock from "../models/stocksModel.js";


export const updateStock = async (req, res) => {
  try {
    const { itemName, quantity, description } = req.body;
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    stock.itemName = itemName;
    stock.quantity = quantity;
    stock.description = description;
    await stock.save();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Stock update failed", error });
  }
};

export const deleteStock = async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.json({ message: "Stock deleted" });
};


export const createStock = async (req, res) => {
  try {
    const { itemName, quantity, description } = req.body;
    const stock = new Stock({ itemName, quantity, description });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Stock creation failed", error });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stocks", error });
  }
};
