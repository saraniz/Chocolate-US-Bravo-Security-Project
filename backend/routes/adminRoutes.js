import express from 'express';
import {
  getDashboardStats,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getAnalytics
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes with authentication and admin middleware
router.use(protect, admin);

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/sales', getAnalytics);

// Order routes
router.route('/orders')
  .get(getOrders);

router.route('/orders/:id')
  .get(getOrderDetails)
  .put(updateOrderStatus);

// Product routes
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// User routes
router.route('/users')
  .get(getUsers)
  .post(registerUser);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

export default router; 