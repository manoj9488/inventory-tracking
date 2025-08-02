import Stock from "../models/stocksModel.js";
import User from "../models/registrationModel.js";


// export const createStock = async (req, res) => {
//   const { itemName, quantity,description } = req.body;
//   const stock = new Stock({ itemName, quantity, description });
//   await stock.save();
//   res.status(201).json(stock);
// };


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




export const createStock = async (req, res) => {
  try{
  const { itemName, quantity, description } = req.body;
  const stock = new Stock({ itemName, quantity, description });
  await stock.save();
  res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Stock creation failed", error });
  }
}


export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stocks", error });
  }
}