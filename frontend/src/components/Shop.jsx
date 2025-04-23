import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular, faSearch, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from '../context/FavoritesContext';

const sampleProducts = [
  // Product objects here (same as you provided earlier)
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-chocolate-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-chocolate-500 hover:bg-chocolate-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-amber-900">Our Chocolate Collection</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search chocolates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500"
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute right-3 top-3 text-neutral-400"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={category === 'all' ? 'default' : 'outline'}
              onClick={() => setCategory('all')}
              className={category === 'all' ? 'bg-chocolate-500 hover:bg-chocolate-600' : ''}
            >
              All
            </Button>
            <Button
              variant={category === 'dark' ? 'default' : 'outline'}
              onClick={() => setCategory('dark')}
              className={category === 'dark' ? 'bg-chocolate-500 hover:bg-chocolate-600' : ''}
            >
              Dark Chocolate
            </Button>
            <Button
              variant={category === 'milk' ? 'default' : 'outline'}
              onClick={() => setCategory('milk')}
              className={category === 'milk' ? 'bg-chocolate-500 hover:bg-chocolate-600' : ''}
            >
              Milk Chocolate
            </Button>
            <Button
              variant={category === 'white' ? 'default' : 'outline'}
              onClick={() => setCategory('white')}
              className={category === 'white' ? 'bg-chocolate-500 hover:bg-chocolate-600' : ''}
            >
              White Chocolate
            </Button>
            <Button
              variant={category === 'gift' ? 'default' : 'outline'}
              onClick={() => setCategory('gift')}
              className={category === 'gift' ? 'bg-chocolate-500 hover:bg-chocolate-600' : ''}
            >
              Gift Boxes
            </Button>
          </div>
        </div>
      )}

      {/* Note: The product cards are NOT displayed here intentionally */}
    </div>
  );
};

export default Shop;