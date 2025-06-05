import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Array van { product: {}, quantity: 1, selectedOptions: {} }

  // **BELANGRIJKE WIJZIGING HIER:** addToCart neemt nu product, quantity, en selectedOptions apart
  const addToCart = useCallback((productToAdd, quantity = 1, selectedOptions = {}) => {
    setCart(prevCart => {
      // De validatie kijkt nu direct naar productToAdd
      if (!productToAdd || typeof productToAdd.price !== 'number') {
        console.error("Invalid product data received by addToCart:", productToAdd);
        return prevCart;
      }

      // Maak een unieke identifier die rekening houdt met product ID EN geselecteerde opties
      // Dit is essentieel voor het onderscheiden van items met verschillende opties
      const itemIdentifier = `${productToAdd.id}-${JSON.stringify(selectedOptions)}`;

      const existingItemIndex = prevCart.findIndex(cartItem => {
        const existingItemIdentifier = `${cartItem.product.id}-${JSON.stringify(cartItem.selectedOptions || {})}`;
        return existingItemIdentifier === itemIdentifier;
      });

      if (existingItemIndex > -1) {
        // Als product (met exact dezelfde opties) al in winkelwagen is, verhoog de hoeveelheid
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity, // Voeg de nieuwe hoeveelheid toe
        };
        return newCart;
      } else {
        // Anders, voeg nieuw product toe, inclusief de geselecteerde opties en de quantity
        return [...prevCart, {
          product: productToAdd,
          quantity: quantity,
          selectedOptions: selectedOptions // Sla de geselecteerde opties op
        }];
      }
    });
  }, []);

  // Functie om een product te verwijderen uit de winkelwagen (of hoeveelheid te verminderen)
  // Let op: als je items met opties hebt, wil je misschien dat removeFromCart ook opties kan specificeren
  // Voor nu blijft het bij product.id om het simpel te houden, maar houd hier rekening mee.
  const removeFromCart = useCallback((productIdToRemove) => {
    setCart(prevCart => {
      // Dit filtert ALLE items met dat product ID, ongeacht opties.
      // Als je specifieke opties wilt verwijderen (bijv. één specifieke koffie met melk ipv alle koffies),
      // moet je hier ook rekening houden met opties, vergelijkbaar met addToCart.
      return prevCart.filter(item => item.product.id !== productIdToRemove);
    });
  }, []);

  // **NIEUWE FUNCTIE:** clearCart - om de hele winkelwagen leeg te maken
  const clearCart = useCallback(() => {
    setCart([]); // Zet de winkelwagen array leeg
  }, []);

  // Functie om de totale prijs van de winkelwagen te berekenen
  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      if (item && item.product && typeof item.product.price === 'number') {
        let itemPrice = item.product.price;
        // Voeg prijsveranderingen van opties toe
        if (item.selectedOptions) {
          Object.values(item.selectedOptions).forEach(option => {
            if (option && typeof option.price_change === 'number') {
              itemPrice += option.price_change;
            }
          });
        }
        return total + (itemPrice * item.quantity);
      }
      console.warn("Invalid item in cart causing price calculation issue:", item);
      return total;
    }, 0);
  }, [cart]);

  // Functie om het totale aantal items in de winkelwagen te berekenen
  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const value = useMemo(() => ({ // Use useMemo to prevent unnecessary re-renders
    cart,
    addToCart,
    removeFromCart,
    clearCart, // Expose the new clearCart function
    totalCartPrice,
    totalCartItems,
  }), [cart, addToCart, removeFromCart, clearCart, totalCartPrice, totalCartItems]); // All dependencies

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};