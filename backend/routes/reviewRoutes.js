import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import reviewController from '../controllers/reviewController.js';

export default function createReviewRouter(redisObjects) {
  const {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
  } = reviewController(redisObjects);

  const router = express.Router();

  // Get reviews for a product
  router.get('/product/:productId', getProductReviews);

  // Add a review (protected route)
  router.post('/product/:productId', protect, addReview);

  // Update a review (protected route)
  router.put('/:reviewId', protect, updateReview);

  // Delete a review (protected route)
  router.delete('/:reviewId', protect, deleteReview);

  return router;
} 