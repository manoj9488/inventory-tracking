import express from "express";
import { loginUser ,adminLogin,} from "../controllers/Logincontroller.js";

const router = express.Router();
router.get("/user", loginUser);
router.get("/admin",adminLogin);
router.post("/user", loginUser);
router.post("/admin",adminLogin);


export default router;