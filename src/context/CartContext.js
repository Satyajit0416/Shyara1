import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const quantity = parseInt(product.quantity, 10) || 1;
    const size = product.size || 'N/A'; // Default size agar nahi hai
    const existingItem = cart.find((item) => item.id === product.id && item.size === size);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity, size, price: parseFloat(product.price) || 0 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, quantity, size) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}