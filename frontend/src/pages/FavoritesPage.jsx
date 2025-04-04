import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

// Import the same sample products for now
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

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Favorites:', favorites);
    console.log('Products:', products);
  }, [favorites, products]);

  const favoriteProducts = products.filter(product => favorites.includes(product._id));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-chocolate-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/shop" className="text-chocolate-500 hover:text-chocolate-600 transition duration-300">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Shop
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">Your Favorite Chocolates</h1>
      </div>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FontAwesomeIcon 
              icon={faHeartRegular} 
              className="text-6xl text-neutral-300 mb-4"
            />
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 mb-6">You haven't added any chocolates to your favorites. Browse our collection and add some delicious treats!</p>
            <Link to="/shop">
              <Button className="bg-chocolate-500 hover:bg-chocolate-600">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
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
                    icon={faHeartSolid}
                    className="text-xl text-red-500"
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

export default FavoritesPage;