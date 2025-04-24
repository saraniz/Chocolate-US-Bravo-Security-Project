import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      console.log("Logged in user data:", userData);
      setUser(userData); // ✅ not userData.user
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.toString() };
    }
  };
  
  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData);
      setUser(newUser); // ✅ not newUser.user
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.toString() };
    }
  };
  

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 