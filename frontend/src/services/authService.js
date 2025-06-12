import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
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

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data?.message || 'An error occurred during login';
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data?.message || 'An error occurred during registration';
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data?.message || 'An error occurred during logout';
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  const token = localStorage.getItem('token');
  return !!(user && token);
}; 