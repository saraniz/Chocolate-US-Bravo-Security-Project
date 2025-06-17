import express from 'express';
import adminController from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

export default function createAdminRouter({ redisClient, sessionStore, invalidateCache }) {
const router = express.Router();
  const controller = adminController({ redisClient, sessionStore, invalidateCache });

// Dashboard routes
  router.get('/dashboard/stats', protect, admin, controller.getDashboardStats);
  router.get('/dashboard/sales', protect, admin, controller.getAnalytics);

// Order routes
router.route('/orders')
    .get(protect, admin, controller.getOrders);
router.route('/orders/:id')
    .get(protect, admin, controller.getOrderDetails)
    .put(protect, admin, controller.updateOrderStatus);

// Product routes
router.route('/products')
    .get(protect, admin, controller.getProducts)
    .post(protect, admin, controller.createProduct);
router.route('/products/:id')
    .put(protect, admin, controller.updateProduct)
    .delete(protect, admin, controller.deleteProduct);

// User routes
router.route('/users')
    .get(protect, admin, controller.getUsers)
    .post(protect, admin, controller.registerUser);
router.route('/users/:id')
    .put(protect, admin, controller.updateUser)
    .delete(protect, admin, controller.deleteUser);

  return router;
} 