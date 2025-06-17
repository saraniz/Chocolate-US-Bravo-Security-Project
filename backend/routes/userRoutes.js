import express from 'express';
import authController from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

export default function createUserRouter(redisObjects) {
  const {
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
  } = authController(redisObjects);

  const router = express.Router();

  router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

  router.route('/')
    .get(protect, admin, getUsers);

  router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

  return router;
} 