import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular, faSearch, faFilter, faSort, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

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

const ShopComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart, totalItems } = useCart();

  useEffect(() => {
    console.log('Current cart total items:', totalItems);
  }, [totalItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product);
    addToCart(product);
    setNotificationProduct(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

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
      {/* Notification */}
      {showNotification && notificationProduct && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>
            Added {notificationProduct.name} to cart!
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-amber-900"></h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dark">Dark Chocolate</SelectItem>
              <SelectItem value="milk">Milk Chocolate</SelectItem>
              <SelectItem value="white">White Chocolate</SelectItem>
              <SelectItem value="gift">Gift Sets</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
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
      )}
    </div>
  );
};

export default ShopComponent;