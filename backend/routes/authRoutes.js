import express from "express";
import {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

export const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.cookie('jwt', token, {
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  });
};


