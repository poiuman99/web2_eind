// src/components/ProductModal.js
import React, { useState } from 'react';
import '../css/productModal.css';

const ProductModal = ({ product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  // EXTRA CONTROLE: Controleer of product en product.price geldig zijn
  if (!product || typeof product.price !== 'number') {
    // Log de fout, zodat je in de console kunt zien welk product het probleem gaf
    console.error("ProductModal received invalid product data:", product);
    return null; // Of toon een foutmelding in de modal
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <h2>{product.name}</h2>

        <div className="modal-product-details">
          <img src={product.image} alt={product.name} className="modal-product-image" />
          <p>Price: €{product.price.toFixed(2)}</p> {/* Hier gebeurt de .toFixed() call */}

          <div className="modal-quantity-selector">
            <button onClick={handleDecreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
        </div>

        <button className="add-to-cart-modal-btn" onClick={handleAddToCart}>
          Add {quantity} to Cart (€{(product.price * quantity).toFixed(2)}) {/* Ook hier */}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;