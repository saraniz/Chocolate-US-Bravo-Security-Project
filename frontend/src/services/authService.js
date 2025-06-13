import { post, get } from './api';
import { toast } from 'react-hot-toast';

// Security helper functions
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const login = async (email, password) => {
  try {
    // Input validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    const response = await post('/auth/login', {
      email: sanitizedEmail,
      password: sanitizedPassword
    });

    if (response) {
      // Store auth data securely
      localStorage.setItem('user', JSON.stringify(response));
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data?.message || 'An error occurred during login';
  }
};

export const register = async (userData) => {
  try {
    // Input validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error('All fields are required');
    }

    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(userData.password)) {
      throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, number and special character');
    }

    // Sanitize inputs
    const sanitizedData = {
      ...userData,
      email: sanitizeInput(userData.email),
      name: sanitizeInput(userData.name),
      password: sanitizeInput(userData.password)
    };

    const response = await post('/auth/register', sanitizedData);

    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    }
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data?.message || 'An error occurred during registration';
  }
};

export const logout = async () => {
  try {
    await post('/auth/logout');
    // Clear all auth data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Clear any other sensitive data
    sessionStorage.clear();
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data?.message || 'An error occurred during logout';
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const user = getCurrentUser();
    const token = localStorage.getItem('token');
    return !!(user && token);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Password reset functionality
export const requestPasswordReset = async (email) => {
  try {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    const sanitizedEmail = sanitizeInput(email);
    return await post('/auth/request-password-reset', { email: sanitizedEmail });
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error.response?.data?.message || 'An error occurred while requesting password reset';
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    if (!validatePassword(newPassword)) {
      throw new Error('Invalid password format');
    }
    const sanitizedPassword = sanitizeInput(newPassword);
    return await post('/auth/reset-password', {
      token,
      password: sanitizedPassword
    });
  } catch (error) {
    console.error('Password reset error:', error);
    throw error.response?.data?.message || 'An error occurred while resetting password';
  }
}; 