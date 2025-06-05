import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalCartPrice, clearCart } = useCart();
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showCashInstruction, setShowCashInstruction] = useState(false);

  const handleCashClick = () => {
    setShowCashInstruction(true);
    setTimeout(() => {
      clearCart();
      navigate('/thankyou');
    }, 3000);
  };

  const handleCardClick = () => {
    setShowPaymentProcessing(true);
    setShowSuccessAnimation(false);

    setTimeout(() => {
      setShowPaymentProcessing(false);
      setShowSuccessAnimation(true);

      setTimeout(() => {
        clearCart();
        navigate('/thankyou');
      }, 1500);
    }, 3000);
  };

  return (
    <div className="payment" ref={ref}>
      <div className="payment__container">
        <div className="payment__title">Payment</div>
        <div className="payment__amount">
          <span className="payment__amount-value">Total= €{totalCartPrice.toFixed(2)}</span>
        </div>
        <div className="payment__back">
          <Link to="/menu" className="payment__back-button">&larr; Back</Link>
        </div>
        {!showPaymentProcessing && !showSuccessAnimation && !showCashInstruction ? (
          <div className="payment__options">
            <div
              className="payment-option"
              onClick={handleCashClick}
              style={{ cursor: 'pointer' }}
            >
              <img src="/img/cash.jpeg" className="payment-option__img" alt="Cash" />
              <div className="payment-option__label">Cash</div>
            </div>
            <div
              className="payment-option"
              onClick={handleCardClick}
              style={{ cursor: 'pointer' }}
            >
              <img src="/img/card.jpg" className="payment-option__img" alt="Card" />
              <div className="payment-option__label">Card</div>
            </div>
          </div>
        ) : showPaymentProcessing ? (
          <div className="payment-processing-screen">
            <p className="processing-text">Follow the steps on the payment device....</p>
            <div className="spinner"></div>
          </div>
        ) : showSuccessAnimation ? (
          <div className="payment-success-screen">
            <div className="checkmark-circle">
              <div className="checkmark">&#10004;</div>
            </div>
            <p className="success-message">Payment successful!</p>
          </div>
        ) : showCashInstruction ? (
          <div className="payment-cash-instruction-screen">
            <p className="cash-instruction-text">Pay at the cash register</p>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default Payment;
