import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalCartPrice } = useCart();
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // Nieuwe state voor succesanimatie

  // Functie voor de klik op contant betalen
  const handleCashClick = () => {
    navigate('/thankyou');
  };

  // Functie voor de klik op kaart betalen (nu met verwerking en succesanimatie)
  const handleCardClick = () => {
    setShowPaymentProcessing(true); // Toon het "Volg stappen" scherm
    setShowSuccessAnimation(false); // Zorg dat succesanimatie verborgen is bij start

    // Simuleer betaalverwerkingstijd (bijv. 3 seconden)
    setTimeout(() => {
      setShowPaymentProcessing(false); // Verberg "Volg stappen" scherm
      setShowSuccessAnimation(true); // Toon succesanimatie

      // Na een korte tijd de succesanimatie te hebben getoond, navigeer naar bedankpagina
      setTimeout(() => {
        navigate('/thankyou');
      }, 1500); // Toon succesanimatie voor 1.5 seconden
    }, 3000); // Verwerking duurt 3 seconden
  };

  return (
    <div className="payment" ref={ref}>
      <div className="payment__container">
        {/* Betalingsbedrag en Terugknop blijven altijd zichtbaar */}
        <div className="payment__amount">
          <span className="payment__amount-value">Total= €{totalCartPrice.toFixed(2)}</span>
        </div>
        <div className="payment__title">Payment</div>
        <div className="payment__back">
          <Link to="/menu" className="payment__back-button">&larr; Back</Link>
        </div>

        {/* Conditionele rendering voor de verschillende schermen */}
        {!showPaymentProcessing && !showSuccessAnimation ? (
          // Toon betaalopties als er niets wordt verwerkt en er geen succes is
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
          // Toon betaalverwerkingsscherm
          <div className="payment-processing-screen">
            <p className="processing-text">Volg de stappen op het betaalapparaat...</p>
            <div className="spinner"></div> {/* Laadspinner */}
          </div>
        ) : (
          // Toon betaling geslaagd animatiescherm
          <div className="payment-success-screen">
            <div className="checkmark-circle">
              <div className="checkmark">&#10004;</div> {/* Unicode vinkje */}
            </div>
            <p className="success-message">Betaling geslaagd!</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Payment;