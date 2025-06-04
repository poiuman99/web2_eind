// src/context/CartContext.js
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

// Maak de Context
const CartContext = createContext();

// Maak een custom hook om de winkelwagen context te gebruiken
export const useCart = () => {
  return useContext(CartContext);
};

// De Provider component die de state en functies beheert
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Array van { product: {}, quantity: 1 }

  // Functie om een product toe te voegen aan de winkelwagen
  const addToCart = useCallback((productToAdd, quantity = 1) => {
    setCart(prevCart => {
      // Zorg ervoor dat het product object en de prijs geldig zijn
      if (!productToAdd || typeof productToAdd.price !== 'number') {
        console.error("Invalid product data received by addToCart:", productToAdd);
        return prevCart; // Return huidige winkelwagen zonder toevoegen
      }

      const existingItemIndex = prevCart.findIndex(item => item.product.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // Als product al in winkelwagen is, verhoog de hoeveelheid
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      } else {
        // Anders, voeg nieuw product toe
        return [...prevCart, { product: productToAdd, quantity: quantity }];
      }
    });
  }, []);

  // Functie om een product te verwijderen uit de winkelwagen (of hoeveelheid te verminderen)
  const removeFromCart = useCallback((productId, quantityToRemove = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === productId);

      if (existingItemIndex === -1) return prevCart; // Product niet gevonden

      const newCart = [...prevCart];
      if (newCart[existingItemIndex].quantity <= quantityToRemove) {
        // Als hoeveelheid 1 is of minder dan te verwijderen, verwijder het item volledig
        return prevCart.filter(item => item.product.id !== productId);
      } else {
        // Anders, verminder de hoeveelheid
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity - quantityToRemove,
        };
        return newCart;
      }
    });
  }, []);

  // Functie om de totale prijs van de winkelwagen te berekenen
  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      // Voeg een extra controle toe voor de item.product.price hier
      if (item && item.product && typeof item.product.price === 'number') {
        return total + (item.product.price * item.quantity);
      }
      console.warn("Invalid item in cart causing price calculation issue:", item);
      return total; // Negeer ongeldig item voor prijsberekening
    }, 0);
  }, [cart]);

  // Functie om het totale aantal items in de winkelwagen te berekenen
  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    totalCartPrice,
    totalCartItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};