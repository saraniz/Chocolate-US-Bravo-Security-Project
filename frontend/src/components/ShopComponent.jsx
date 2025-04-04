import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faFilter, 
  faSearch, 
  faShoppingCart,
  faSort,
  faSortUp,
  faSortDown,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { getProducts, searchProducts, getProductsByCategory } from '../services/productService';

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
  const { addToCart, cart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Received non-array data:', data);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      setError('Failed to load products. Please try again later.');
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
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Received non-array data:', data);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setError('Failed to search products. Please try again later.');
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
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Received non-array data:', data);
        setProducts([]);
      }
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
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
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
              className="w-full px-4 py-2 focus:outline-none bg-transparent"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(products) && products.map((product) => (
          <div 
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="relative h-48">
              <img
                src={product.images[0]?.url || 'https://via.placeholder.com/300x200?text=Chocolate'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => handleImageError(product._id)}
              />
              <button
                onClick={() => toggleFavorite(product._id)}
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
              <h3 className="text-lg font-bold truncate">{product.name}</h3>
              <span className="inline-block bg-gray-100 text-[#8B4513] px-3 py-1 rounded-full text-sm my-2">
                {product.category}
              </span>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-[#8B4513]">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span className="ml-1 text-sm">{product.ratings || 'New'}</span>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {product.description}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="mt-auto bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {Array.isArray(products) && products.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
          <h3 className="text-xl text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ShopComponent;