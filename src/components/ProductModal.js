
import React, { useState, useEffect } from 'react';
import '../css/productModal.css';

const ProductModal = ({ product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});


  useEffect(() => {
    if (product.options) {
      const defaults = {};
      product.options.forEach(option => {
        if (option.default && option.choices) {
          const defaultChoice = option.choices.find(c => c.value === option.default);
          if (defaultChoice) {
            defaults[option.name] = defaultChoice;
          }
        }
      });
      setSelectedOptions(defaults);
    }
  }, [product]);

  if (!product || typeof product.price !== 'number') {
    return null;
  }

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleOptionChange = (optionName, choice) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choice
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedOptions);
    onClose();
  };

  const calculateTotalPrice = () => {
    let total = product.price * quantity;
    Object.values(selectedOptions).forEach(option => {
      if (option?.price_change) {
        total += option.price_change * quantity;
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <h2>{product.name}</h2>
        {product.description && <p className="product-description">{product.description}</p>}
        
        <img src={product.image} alt={product.name} className="modal-product-image" />
        <p className="product-price">€{product.price.toFixed(2)}</p>

        
        {product.options?.map(option => (
          <div key={option.name} className="modal-option-group">
            <h4>{option.name}:</h4>
            <div className="options-list">
              {option.choices.map(choice => (
                <button
                  key={choice.value}
                  className={`option-btn ${
                    selectedOptions[option.name]?.value === choice.value ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionChange(option.name, choice)}
                >
                  {choice.label}
                  {choice.price_change !== 0 && (
                    <span className="price-change">
                      {choice.price_change > 0 ? ` (+€${choice.price_change.toFixed(2)})` : 
                       choice.price_change < 0 ? ` (-€${Math.abs(choice.price_change).toFixed(2)})` : ''}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="modal-quantity-selector">
          <button onClick={handleDecreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>

        <button className="add-to-cart-modal-btn" onClick={handleAddToCart}>
          Add {quantity} to cart - €{calculateTotalPrice()}
          {Object.keys(selectedOptions).length > 0 && 
            ` (${Object.values(selectedOptions).map(opt => opt.label).join(', ')})`
          }
        </button>
      </div>
    </div>
  );
};

export default ProductModal;