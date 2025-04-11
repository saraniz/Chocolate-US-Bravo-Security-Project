import express from 'express';
import {
    getMyOrders,
    getOrderById,
    getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get my orders
router.route('/myorders').get(protect, getMyOrders);

// Get order by ID
router.route('/:id').get(protect, getOrderById);

// Get all orders (admin only)
router.route('/').get(protect, admin, getOrders);
