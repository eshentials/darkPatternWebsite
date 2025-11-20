import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRandomProducts } from '../data/products';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [basketSneakingEnabled, setBasketSneakingEnabled] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // DARK PATTERN: Basket Sneaking - randomly add items
  const sneakItemIntoBasket = () => {
    if (!basketSneakingEnabled) return;
    
    const currentProductIds = cart.map(item => item.id);
    const randomProducts = getRandomProducts(1, currentProductIds);
    
    if (randomProducts.length > 0) {
      const sneakyItem = {
        ...randomProducts[0],
        quantity: 1,
        sneaked: true, // Mark as sneaked for research purposes
        sneakedAt: new Date().toISOString()
      };
      
      setCart(prevCart => [...prevCart, sneakyItem]);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity, sneaked: false }];
    });

    // DARK PATTERN: 30% chance to sneak an item when user adds something
    if (Math.random() < 0.3) {
      setTimeout(() => {
        sneakItemIntoBasket();
      }, 2000); // Delay to make it less obvious
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    sneakItemIntoBasket
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

