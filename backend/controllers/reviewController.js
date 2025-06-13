import Review from '../models/Review.js';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

export default function reviewController({ invalidateCache }) {
  // Get reviews for a product
  const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  });

  // Add a review
  const addReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    // Create new review
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment
    });

    await review.save();

    // Update product average rating and review count
    const allReviews = await Review.find({ product: productId });
    const averageRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
    product.rating = averageRating;
    product.numReviews = allReviews.length;
    await product.save();

    // Invalidate cache for this product
    await invalidateCache(`products*${productId}*`);

    // Populate user details before sending response
    await review.populate('user', 'name');

    res.status(201).json(review);
  });

  // Update a review
  const updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this review');
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update product average rating
    const product = await Product.findById(review.product);
    const allReviews = await Review.find({ product: review.product });
    const averageRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
    product.rating = averageRating;
    product.numReviews = allReviews.length;
    await product.save();

    // Invalidate cache for this product
    await invalidateCache(`products*${review.product}*`);

    await review.populate('user', 'name');
    res.json(review);
  });

  // Delete a review
  const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this review');
    }

    await review.deleteOne();

    // Update product average rating and review count
    const product = await Product.findById(review.product);
    const allReviews = await Review.find({ product: review.product });
    const averageRating = allReviews.length > 0 
      ? allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length 
      : 0;
    product.rating = averageRating;
    product.numReviews = allReviews.length;
    await product.save();

    // Invalidate cache for this product
    await invalidateCache(`products*${review.product}*`);

    res.json({ message: 'Review deleted successfully' });
  });

  return {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
  };
} 