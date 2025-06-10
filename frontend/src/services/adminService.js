import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admin';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

// Orders
export const getOrders = async (page = 1) => {
  const response = await api.get(`/orders?page=${page}`);
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId, isDelivered) => {
  const response = await api.put(`/orders/${orderId}`, { isDelivered });
  return response.data;
};

// Users
export const getUsers = async (page = 1) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

// Products
export const getProducts = async (page = 1, keyword = '') => {
  const response = await api.get(`/products?page=${page}&keyword=${keyword}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await api.put(`/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

// Analytics
export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
}; 