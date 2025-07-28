import express from "express";
import { loginUser ,adminLogin} from "../controllers/Logincontroller.js";

const router = express.Router();
router.get("/login/user", loginUser);
router.get("/login/admin",adminLogin);


export default router;