import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Get reviews for a product
router.get('/product/:productId', reviewController.getProductReviews);

// Add a review (protected route)
router.post('/product/:productId', protect, reviewController.addReview);

// Update a review (protected route)
router.put('/:reviewId', protect, reviewController.updateReview);

// Delete a review (protected route)
router.delete('/:reviewId', protect, reviewController.deleteReview);

export default router; 