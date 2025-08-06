import express from "express";
import {
  createStock, updateStock, deleteStock,
  getAllStocks
} from "../controllers/adminController.js";
const router = express.Router();


router.post("/stock", createStock);
router.get("/stocks", getAllStocks);
router.put("/stock/:id", updateStock);
router.delete("/stock/:id", deleteStock);


export default router;