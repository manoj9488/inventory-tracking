import express from "express";
import {
  createStock, updateStock, deleteStock,
  getAllStocks, getAllUsers
} from "../controllers/adminController.js";
const router = express.Router();


router.post("/stock", createStock);
router.get("/stocks", getAllStocks);
router.put("/stock/:id", updateStock);
router.delete("/stock/:id", deleteStock);

router.get("/users", getAllUsers);

export default router;