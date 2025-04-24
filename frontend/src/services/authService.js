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

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    // Store user data in localStorage (token is handled by cookie)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
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
    // Store user data in localStorage (token is handled by cookie)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
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
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data?.message || 'An error occurred during logout';
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; // user object directly
};


export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};

// Add token to all axios requests
api.interceptors.request.use(
  (config) => {
    // No need to add token to headers as it's handled by cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 