import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in cookies or headers
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify token with proper error handling
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      maxAge: '24h'
    });

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401);
      throw new Error('User account is deactivated');
    }

    // Add user to request object
    req.user = user;
    
    // Add token to request for potential blacklist checking
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth Error Details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    if (error.name === 'TokenExpiredError') {
      res.status(401);
      throw new Error('Token expired, please login again');
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401);
      throw new Error('Invalid token, please login again');
    }

    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Admin middleware with enhanced checks
export const admin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }

  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }

  // Additional admin validation if needed
  if (!req.user.isActive) {
    res.status(403);
    throw new Error('Admin account is deactivated');
  }

  next();
});
  