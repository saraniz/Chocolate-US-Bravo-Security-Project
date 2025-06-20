import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faArrowLeft,
  faShoppingCart,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/productService';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      // ✅ Fix: extract products from the response
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error('Received non-array data:', data);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  const handleAddToCart = (product) => {
    addToCart(product);
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
        </div>
      </div>
    );
  }

  const favoriteProducts = products.filter(product => favorites.includes(product._id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/shop" className="text-[#8B4513] hover:text-[#A0522D] flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Shop
        </Link>
        <h1 className="text-3xl font-bold text-[#8B4513] mt-4">Your Favorite Chocolates</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <FontAwesomeIcon 
            icon={faHeart} 
            className="text-6xl text-[#8B4513] opacity-50 mb-4"
          />
          <h2 className="text-2xl text-gray-600 mb-2">No Favorites Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't added any chocolates to your favorites. Browse our collection and add some delicious treats!
          </p>
          <Link 
            to="/shop" 
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-6 rounded-lg"
          >
            Explore Our Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteProducts.map((product) => (
            <Link to={`/product/${product._id}`} className="block">
            <div 
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={product.images[0]?.url || 'https://via.placeholder.com/300x200?text=Chocolate'}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;