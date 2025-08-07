import express from "express";
const router = express.Router();
import { userRegistration, AdminRegistration, getRegistration, deleteuser} from "../controllers/registartionController.js";

router.post("/register/user", userRegistration);
router.post("/register/admin", AdminRegistration);
router.get("/Users", getRegistration);
router.delete("/user/:id", deleteuser);

export default router;
