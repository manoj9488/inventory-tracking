import express from "express";
const router = express.Router();
import { createRegistration } from "../controllers/registartionController.js";

router.post("/create", createRegistration);

export default router;
