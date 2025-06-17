import express from "express";
import authController from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default function createAuthRouter(redisObjects) {
  const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser
  } = authController(redisObjects);

const router = express.Router();

// Create admin user route (only for development)
router.post('/create-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    });

    res.status(201).json({
      message: 'Admin user created successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
  router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
  router.route('/users')
    .get(protect, admin, getUsers);
  router.route('/users/:id')
    .delete(protect, admin, deleteUser);

  return router;
}

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


