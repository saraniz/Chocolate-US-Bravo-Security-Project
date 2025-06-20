import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/orders' || 'http://localhost:8000/api/orders';

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

export const getOrders = async () => {
  try {
    console.log('Fetching orders from:', API_URL);
    const response = await api.get('/orders');
    console.log('Orders fetched successfully:', response.data);
    
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
