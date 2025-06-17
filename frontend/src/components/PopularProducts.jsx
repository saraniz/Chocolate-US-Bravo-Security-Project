import React, { useState, useEffect } from 'react'
import { getPopularProducts } from '@/services/productService'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getPopularProducts();
        console.log('Fetched popular products:', data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid response format:', data);
          setError('Invalid response format from server');
          toast.error('Failed to load popular products');
        }
      } catch (err) {
        console.error('Error fetching popular products:', err);
        setError('Failed to fetch popular products');
        toast.error('Failed to load popular products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="my-48 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading popular products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-48 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="my-48 text-center">
        <p className="text-gray-500">No popular products found</p>
      </div>
    );
  }

  return (
    <div className='my-48'>
      <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">Popular Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <Card className="hover:shadow-lg transition duration-300 cursor-pointer">
              <CardHeader>
                <img 
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-md text-chocolate-500"> USD {product.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{product.rating.toFixed(1)}</span>
                    <span className="ml-1 text-gray-500">({product.numReviews})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
