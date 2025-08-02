import express from "express";
import { loginUser ,adminLogin,} from "../controllers/loginController.js";

const router = express.Router();

router.post("/user", loginUser);
router.post("/admin",adminLogin);


export default router;