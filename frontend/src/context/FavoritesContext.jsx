import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      console.log('Initial favorites from localStorage:', savedFavorites);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      console.log('Saving favorites to localStorage:', favorites);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const toggleFavorite = (productId) => {
    console.log('Toggling favorite for product:', productId);
    console.log('Current favorites:', favorites);
    
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.includes(productId);
      const newFavorites = isFavorite
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];
      
      console.log('New favorites:', newFavorites);
      return newFavorites;
    });
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite: (productId) => favorites.includes(productId)
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 