// src/components/Order.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importeer de useCart hook

const Order = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  // Haal de winkelwagen en removeFromCart functie op uit de context
  const { cart, removeFromCart, totalCartPrice } = useCart();

  const goToMenu = () => {
    navigate('/menu');
  };

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="order-page-wrapper" ref={ref}>
      <div className="container">
      

        <h1>Order details</h1>

        {/* DIT IS DE GEDETAILLEERDE LIJST VAN WINKELWAGEN ITEMS */}
        <div className="cart-detailed-list">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div className="cart-item-detail" key={item.product.id}>
                <span>
                  {item.quantity}x {item.product.name} -
                  {/* Zorg ervoor dat de prijs geldig is voordat toFixed wordt aangeroepen */}
                  {typeof item.product.price === 'number' ? `€${(item.product.price * item.quantity).toFixed(2)}` : 'Price N/A'}
                </span>
                <button
                  className="remove-from-cart-btn"
                  onClick={() => removeFromCart(item.product.id)} // Verwijder één item per klik
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