import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { getProductReviews, addReview } from "../services/reviewService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faShoppingCart, 
  faTruck, 
  faShieldAlt, 
  faUndo, 
  faStar,
  faCreditCard,
  faMoneyBillWave,
  faCalendarAlt,
  faBox,
  faExchangeAlt,
  faUser,
  faSpinner,
  faCheckCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcPaypal, faPaypal } from "@fortawesome/free-brands-svg-icons";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const { addToCart } = useCart();
  const [review, setReview] = useState({
    rating: 5,
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        const [productData, reviewsData] = await Promise.all([
          getProductById(id),
          getProductReviews(id)
        ]);
        
        if (productData) {
          setProduct(productData);
          setThumbnail(productData.images[0]);
        } else {
          setError("Product not found");
        }
        
        if (reviewsData) {
          setReviews(reviewsData);
        }
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setInCart(true);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity });
      // Add navigation to checkout page here
    }
  };

  const increment = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    try {
      setReviewLoading(true);
      setReviewError(null);
      setReviewSuccess(false);

      const newReview = await addReview(id, review);
      setReviews([newReview, ...reviews]);
      setReview({ rating: 5, comment: "" });
      setReviewSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setReviewSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Review submission error:', error);
      setReviewError(error.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error || "Product not found"}</h2>
          <Link to="/shop" className="text-amber-900 hover:text-amber-800">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-amber-900 transition-colors">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/shop" className="text-gray-500 hover:text-amber-900 transition-colors">Shop</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-amber-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="flex gap-6">
              {/* Main Image */}
              <div className="w-3/4">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-50 rounded-xl">
                  <img
                    src={thumbnail}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="w-1/4 space-y-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className={`w-full aspect-w-1 aspect-h-1 overflow-hidden bg-gray-50 rounded-lg transition-all duration-200 ${
                      thumbnail === image ? 'ring-2 ring-amber-900' : 'hover:ring-1 hover:ring-amber-900/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">{product.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-5 h-5 ${
                        i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-medium text-amber-900">
                    ${product.price?.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
                <div className={`px-3 py-1 text-sm font-medium ${
                  product.stock > 0 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-red-700 bg-red-50'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Category</h3>
              <span className="inline-block text-sm text-amber-900 border border-amber-900 px-3 py-1">
                {product.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-amber-900 w-5 h-5" />
                    <div>
                      <span className="text-gray-600">Delivery Time</span>
                      <p className="font-medium">3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faTruck} className="text-amber-900 w-5 h-5" />
                    <div>
                      <span className="text-gray-600">Shipping Cost</span>
                      <p className="font-medium text-green-600">Free</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-amber-900 w-5 h-5" />
                    <div>
                      <span className="text-gray-600">Return Policy</span>
                      <p className="font-medium">30 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faCreditCard} className="text-amber-900 w-5 h-5" />
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faCcVisa} className="text-blue-600 w-6 h-6" />
                      <FontAwesomeIcon icon={faCcMastercard} className="text-red-600 w-6 h-6" />
                      <span className="text-gray-600">Credit/Debit Card</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faPaypal} className="text-blue-600 w-5 h-5" />
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faCcPaypal} className="text-blue-600 w-6 h-6" />
                      <span className="text-gray-600">PayPal</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-amber-900 w-5 h-5" />
                    <span className="text-gray-600">Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 border border-gray-200 rounded-lg px-3 py-2">
                <button
                  onClick={decrement}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 bg-amber-900 text-white px-6 py-3 font-medium hover:bg-amber-800 transition-colors rounded-lg ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 border border-amber-900 text-amber-900 px-6 py-3 font-medium hover:bg-amber-50 transition-colors rounded-lg disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <div className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-gray-900">Customer Reviews</h2>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-5 h-5 ${
                        i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.numReviews || 0} {product.numReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
            
            {/* Review Form */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
              {!isAuthenticated ? (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Please log in to write a review</p>
                  <Link
                    to="/login"
                    state={{ from: `/product/${id}` }}
                    className="inline-block bg-amber-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-800 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReview({ ...review, rating: star })}
                          className="focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            className={`w-6 h-6 ${
                              star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <textarea
                      id="comment"
                      rows={4}
                      value={review.comment}
                      onChange={(e) => setReview({ ...review, comment: e.target.value })}
                      className="p-4 w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-900 focus:ring-amber-900"
                      placeholder="Share your experience with this product..."
                      required
                    />
                  </div>
                  {reviewError && (
                    <div className="flex items-center text-red-600">
                      <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                      <span>{reviewError}</span>
                    </div>
                  )}
                  {reviewSuccess && (
                    <div className="flex items-center text-green-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      <span>Review submitted successfully!</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="w-full bg-amber-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reviewLoading ? (
                      <span className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        Submitting...
                      </span>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-100 pb-8 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.user?.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 p-4">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
