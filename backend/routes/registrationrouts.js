import express from "express";
const router = express.Router();
import { userRegistration, AdminRegistration} from "../controllers/registartionController.js";

router.post("/register/user", userRegistration);
router.post("/register/admin", AdminRegistration);
// router.get("/get", getRegistration);
// router.delete("/delete/:id", deleteRegistration);
// router.put("/update/:id", putRegistration);
export default router;
 