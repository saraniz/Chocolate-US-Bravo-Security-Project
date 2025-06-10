import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
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
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Admin API endpoints
export const adminApi = {
  // Auth
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),
  verifyToken: () => api.get('/admin/verify'),
  
  // Products
  addProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getAllProducts: () => api.get('/products'),
  
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getSalesData: () => api.get('/admin/dashboard/sales'),
  
  // Upload
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api; 