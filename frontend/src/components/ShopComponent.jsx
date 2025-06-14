import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faFilter,
  faSearch,
  faShoppingCart,
  faSort,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { getProducts, searchProducts, getProductsByCategory } from '../services/productService';
import { Link } from 'react-router-dom';

const ShopComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const [imageError, setImageError] = useState({});

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Log products state changes for debugging
  useEffect(() => {
    console.log('🔄 Products state updated:', {
      count: products.length,
      products: products
    });
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('🔄 Starting to fetch products...');
      setLoading(true);
      setError(null);
      
      const response = await getProducts();
      console.log('📦 Raw API response:', response);
      
      if (!response) {
        console.error('❌ No response received from API');
        throw new Error('No response received from server');
      }
      
      // Handle both paginated and direct array responses
      const products = Array.isArray(response) ? response : response.products || [];
      
      console.log('📦 Processed products:', {
        isArray: Array.isArray(products),
        length: products?.length,
        firstProduct: products[0],
        allProducts: products
      });
      
      setProducts(products);
    } catch (err) {
      console.error('❌ Error in fetchProducts:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });
      setError(err.response?.data?.message || 'Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (productId) => {
    setImageError(prev => ({ ...prev, [productId]: true }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (searchTerm) {
        data = await searchProducts(searchTerm);
      } else if (category !== 'All') {
        data = await getProductsByCategory(category);
      } else {
        data = await getProducts();
      }
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setError(err.response?.data?.message || 'Failed to search products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationProduct(product);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
      setNotificationProduct(null);
    }, 3000);
  };

  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);
    try {
      setLoading(true);
      setError(null);
      let data;
      if (newCategory === 'All') {
        data = await getProducts();
      } else {
        data = await getProductsByCategory(newCategory);
      }
      console.log('Category products:', data);
        setProducts([...data]);
    } catch (err) {
      console.error('Error in handleCategoryChange:', err);
      setError('Failed to filter products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    let sortedProducts = [...products];
    switch (newSort) {
      case 'price-low':
        sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        sortedProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        break;
    }
    setProducts([...sortedProducts]);
  };

  const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.images || [product.image];

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B4513]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={fetchProducts}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-4">We couldn't find any products matching your criteria.</p>
          <button
            onClick={fetchProducts}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-4 rounded"
          >
            Refresh Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-16 px-8 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Premium Chocolate Collection</h1>
        <p className="text-xl opacity-90 mb-8">Discover our handcrafted selection of fine chocolates</p>
        <div className="max-w-2xl mx-auto bg-white/90 rounded-lg p-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSearch} className="text-[#8B4513] ml-4" />
            <input
              type="text"
              placeholder="Search chocolates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 focus:outline-none bg-transparent text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
          <button
            onClick={() => handleSortChange('price-low')}
            disabled={sort === 'price-low'}
            className="border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSort} />
            Price: Low to High
          </button>
          <button
            onClick={() => handleSortChange('price-high')}
            disabled={sort === 'price-high'}
            className="border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSort} />
            Price: High to Low
          </button>
        </div>

        {showFilters && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-600 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Nut Chocolate', 'Gift Box'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full ${
                    category === cat
                      ? 'bg-[#8B4513] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notification */}
      {notification && notificationProduct && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {notificationProduct.name} added to cart!
        </div>
      )}

      {/* Products Grid */}
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <Link to={`/product/${product._id}`} className="block">
                <div className="relative h-48">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300x200?text=Chocolate'}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(product._id)}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product._id);
                    }}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={isFavorite(product._id) ? 'text-pink-500' : 'text-[#8B4513]'}
                    />
                  </button>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col h-[250px]">
                  <h3 className="text-lg font-bold truncate">{product.name || 'Unnamed Product'}</h3>
                  <span className="inline-block bg-gray-100 text-[#8B4513] px-3 py-1 rounded-full text-sm my-2">
                    {product.category || 'Unknown'}
                  </span>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-semibold">${product.price?.toFixed(2) || '0.00'}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={index < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full bg-[#8B4513] text-white font-bold py-2 px-4 rounded-lg ${
                    product.stock === 0 ? 'bg-gray-400' : 'hover:bg-[#A0522D]'
                  }`}
                  disabled={product.stock === 0}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopComponent;