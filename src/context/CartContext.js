import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((productToAdd, quantity = 1, selectedOptions = {}) => {
    setCart(prevCart => {
      if (!productToAdd || typeof productToAdd.price !== 'number') {
        console.error("Invalid product data received by addToCart:", productToAdd);
        return prevCart;
      }

      const itemIdentifier = `${productToAdd.id}-${JSON.stringify(selectedOptions)}`;

      const existingItemIndex = prevCart.findIndex(cartItem => {
        const existingItemIdentifier = `${cartItem.product.id}-${JSON.stringify(cartItem.selectedOptions || {})}`;
        return existingItemIdentifier === itemIdentifier;
      });

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      } else {
        return [...prevCart, {
          product: productToAdd,
          quantity: quantity,
          selectedOptions: selectedOptions
        }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productIdToRemove) => {
    setCart(prevCart => {
      return prevCart.filter(item => item.product.id !== productIdToRemove);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      if (item && item.product && typeof item.product.price === 'number') {
        let itemPrice = item.product.price;
        if (item.selectedOptions) {
          Object.values(item.selectedOptions).forEach(option => {
            if (option && typeof option.price_change === 'number') {
              itemPrice += option.price_change;
            }
          });
        }
        return total + (itemPrice * item.quantity);
      }
      return total;
    }, 0);
  }, [cart]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalCartPrice,
    totalCartItems,
  }), [cart, addToCart, removeFromCart, clearCart, totalCartPrice, totalCartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
