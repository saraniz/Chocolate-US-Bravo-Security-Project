import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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
    const response = await api.get('/products');
    console.log('Full API response:', response);
    console.log('Response data:', response.data);
    // Handle both paginated and non-paginated responses
    if (response.data && response.data.products) {
      console.log('Products:', response.data.products);
      return Array.isArray(response.data.products) ? response.data.products : [];
    }
    if (Array.isArray(response.data)) {
      console.log('Direct array response:', response.data);
      return response.data;
    }
    console.log('No valid products found in response');
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    console.log('Product by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    console.log('Category response:', response.data);
    if (response.data && response.data.products) {
      return Array.isArray(response.data.products) ? response.data.products : [];
    }
    if (Array.isArray(response.data)) {
      return response.data;
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
    const response = await api.get(`/products/search?keyword=${keyword}`);
    console.log('Search response:', response.data);
    if (response.data && response.data.products) {
      return Array.isArray(response.data.products) ? response.data.products : [];
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const getPopularProducts = async () => {
  try {
    console.log('Fetching popular products...');
    const response = await api.get('/products/popular');
    console.log('Popular products response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
};