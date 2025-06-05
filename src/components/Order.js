import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Order = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalCartPrice } = useCart();

  const goToMenu = () => navigate('/menu');
  const goToPayment = () => navigate('/payment');

  return (
    <div className="order-page-wrapper" ref={ref}>
      <div className="container">
        <h1>Order details</h1>

        <div className="cart-detailed-list">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${JSON.stringify(item.selectedOptions)}`} className="cart-item-wrapper">
                <div className="cart-item-detail">
                  <div className="cart-item-info">
                    <span className="cart-item-name">
                      {item.quantity}x {item.product.name}
                    </span>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="selected-options">
                        {Object.entries(item.selectedOptions).map(([optionName, optionValue]) => (
                          <span key={optionName} className="selected-option">
                            {optionName}: {optionValue.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="cart-item-price">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
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
        <div className="order__order-type">Order</div>
        <div className="order__summary">
          <div className="cart-summary-widget">
              <img src="/img/pngegg.png" alt="Shopping Cart" className="cart-icon" width="30" />
              <div className="order__total">Total: €{totalCartPrice.toFixed(2)}</div>
            </div>
          <button className="order__details-btn" onClick={goToMenu}>
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