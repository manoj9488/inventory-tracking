import express from "express";
import { getStocks } from "../controllers/userController.js";
import { protect } from "../middleware/Authmiddleware.js";

const router = express.Router();

router.get("/stocks", protect, getStocks);
export default router;
