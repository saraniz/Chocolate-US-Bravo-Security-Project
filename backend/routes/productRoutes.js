import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get top products
router.get('/top', getTopProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Search products
router.get('/search', searchProducts);

// Get product by ID - should be after all specific routes
router.get('/:id', getProductById);

// Product CRUD
router.route('/')
  .post(protect, admin, createProduct);

router.route('/:id/reviews')
  .post(protect, createProductReview);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
