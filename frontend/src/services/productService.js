import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Get all products
export const getProducts = async () => {
  try {
    console.log('Fetching products from:', API_URL);
    const response = await api.get('/');
    console.log('Products fetched successfully:', response.data);
    
    // Handle paginated response
    if (response.data && response.data.products) {
      return response.data.products;
    }
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/category/${category}`);
    if (response.data && response.data.products) {
      return response.data.products;
    }
    return [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Search products
export const searchProducts = async (keyword) => {
  try {
    const response = await api.get(`/search?keyword=${keyword}`);
    if (response.data && response.data.products) {
      return response.data.products;
    }
    return [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}; 