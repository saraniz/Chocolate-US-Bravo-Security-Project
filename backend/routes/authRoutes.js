import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/logout', authMiddleware, logoutUser);

export default router;
