// src/components/Order.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Ontvang cart-gerelateerde props van App.js
const Order = React.forwardRef(({ cart, removeFromCart, totalCartPrice }, ref) => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu');
  };

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="order-page-wrapper" ref={ref}>
      <div className="container">
        <img src="/img/logo3-uitgeknipt beter copy.png" alt="Jelresen logo" className="logo" />

        <h1>Order details</h1>

        {/* DIT IS DE GEDETAILLEERDE LIJST VAN WINKELWAGEN ITEMS */}
       // ... (binnen de return van Order)

<div className="cart-detailed-list">
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    cart.map(item => (
      <div className="cart-item-detail" key={item.product.id}>
        <span>
          {item.quantity}x {item.product.name} -
          {/* EXTRA CONTROLE: Controleer voordat toFixed wordt aangeroepen */}
          {typeof item.product.price === 'number' ? `€${(item.product.price * item.quantity).toFixed(2)}` : 'Price N/A'}
        </span>
        <button
          className="remove-from-cart-btn"
          onClick={() => removeFromCart(item.product.id)}
        >
          Remove
        </button>
      </div>
    ))
  )}
</div>

      </div>

      <footer className="order__footer">
        <div className="order__order-type">Order-Eat In</div>
        <div className="order__summary">
          <div className="order__total">Total= €{totalCartPrice.toFixed(2)}</div>
          <button
            className="order__details-btn"
            onClick={goToMenu}
          >
            ← Back to Menu
          </button>
        </div>
        <button
          className="order__pay-btn"
          onClick={goToPayment}
          disabled={cart.length === 0}
        >
          Pay
        </button>
      </footer>
    </div>
  );
});

export default Order;