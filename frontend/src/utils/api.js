import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Admin API endpoints
export const adminApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/me'),
  
  // Products
  addProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getAllProducts: () => api.get('/admin/products'),
  
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getSalesData: () => api.get('/admin/dashboard/sales'),
  
  // Upload
  uploadImage: (formData) => api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api; 