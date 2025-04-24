import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('Loading cart from localStorage:', savedCart);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      // Calculate initial totals
      const items = parsedCart.reduce((total, item) => total + item.quantity, 0);
      const price = parsedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      setTotalItems(items);
      setTotalPrice(price);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Cart updated:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Calculate totals
    const items = cart.reduce((total, item) => total + item.quantity, 0);
    const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log('New totals - Items:', items, 'Price:', price);
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated existing item in cart:', newCart);
        return newCart;
      }
      
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      console.log('Added new item to cart:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    console.log('Removing from cart:', productId);
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    console.log('Updating quantity:', productId, quantity);
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 