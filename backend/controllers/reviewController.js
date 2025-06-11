import Review from '../models/Review.js';
import Product from '../models/Product.js';

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Add a review
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id; // Assuming you have authentication middleware

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
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

    // Populate user details before sending response
    await review.populate('user', 'name');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
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

    await review.populate('user', 'name');
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
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

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
}; 