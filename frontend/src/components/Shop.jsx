import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular, faSearch, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from '../context/FavoritesContext';

// Sample products data
const sampleProducts = [
  {
    _id: "1",
    name: "Luxury Dark Chocolate Box",
    category: "dark",
    price: 29.99,
    description: "A premium collection of handcrafted dark chocolates with exotic flavors from around the world.",
    stock: 15,
    images: [
      {
        url: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Luxury Dark Chocolate Box"
      }
    ],
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    _id: "2",
    name: "Milk Chocolate Truffles",
    category: "milk",
    price: 24.99,
    description: "Creamy milk chocolate truffles with a smooth, velvety texture and rich cocoa flavor.",
    stock: 20,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Milk Chocolate Truffles"
      }
    ],
    createdAt: "2024-03-14T15:30:00Z"
  },
  {
    _id: "3",
    name: "White Chocolate Collection",
    category: "white",
    price: 27.99,
    description: "Delicate white chocolate pieces with hints of vanilla and caramel, perfect for special occasions.",
    stock: 10,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "White Chocolate Collection"
      }
    ],
    createdAt: "2024-03-13T09:15:00Z"
  },
  {
    _id: "4",
    name: "Premium Gift Set",
    category: "gift",
    price: 49.99,
    description: "An elegant gift box containing our finest selection of chocolates, perfect for any celebration.",
    stock: 8,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Premium Gift Set"
      }
    ],
    createdAt: "2024-03-12T14:20:00Z"
  },
  {
    _id: "5",
    name: "Dark Chocolate Bars",
    category: "dark",
    price: 19.99,
    description: "Artisanal dark chocolate bars with varying cocoa percentages for the true chocolate connoisseur.",
    stock: 0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Dark Chocolate Bars"
      }
    ],
    createdAt: "2024-03-11T11:45:00Z"
  },
  {
    _id: "6",
    name: "Milk Chocolate Gift Box",
    category: "milk",
    price: 34.99,
    description: "A beautifully packaged selection of our finest milk chocolates, perfect for gifting.",
    stock: 12,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Milk Chocolate Gift Box"
      }
    ],
    createdAt: "2024-03-10T16:30:00Z"
  }
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

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

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
              Gift Sets
            </Button>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setCategory('all');
            }}
            className="mt-4 bg-chocolate-500 hover:bg-chocolate-600"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square">
                <img
                  src={product.images[0]?.url || '/placeholder-image.jpg'}
                  alt={product.images[0]?.alt || product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={favorites.includes(product._id) ? faHeartSolid : faHeartRegular}
                    className={`text-xl ${favorites.includes(product._id) ? 'text-red-500' : 'text-neutral-400'}`}
                  />
                </button>
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-800">${product.price}</span>
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700"
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop; 