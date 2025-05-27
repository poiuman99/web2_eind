// src/components/Payment.js

import React from 'react';
// Importeer Link en useNavigate voor navigatie
import { Link, useNavigate } from 'react-router-dom';

// BELANGRIJK: Wikkel de componentdefinitie in React.forwardRef
const Payment = React.forwardRef((props, ref) => {
  const navigate = useNavigate(); // Initialiseer useNavigate hook

  // Functie voor de klik op contant betalen
  const handleCashClick = () => {
    navigate('/thankyou'); // Navigeer naar de bedankpagina
  };

  // Functie voor de klik op kaart betalen
  const handleCardClick = () => {
    navigate('/thankyou'); // Navigeer naar de bedankpagina
  };

  return (
    // BELANGRIJK: Pas de 'ref' toe op het TOP-LEVEL DOM-element van deze component
    <div className="payment" ref={ref}>
      <div className="payment__container">
        <div className="payment__header">
          {/* BELANGRIJK: Pas het afbeeldingspad aan als je img map in public/ staat. */}
          <img src="/img/logo3-uitgeknipt beter copy.png" className="payment__logo" alt="logo" />
        </div>
        <div className="payment__title">Payment</div>
        <div className="payment__back">
          {/* BELANGRIJK: Gebruik de Link component voor interne navigatie in React Router */}
          <Link to="/menu" className="payment__back-button">&larr; Back</Link> {/* Navigeer terug naar de menupagina */}
        </div>
        <div className="payment__options">
          <div
            className="payment-option"
            // BELANGRIJK: Gebruik React's onClick event en de navigate functie
            onClick={handleCashClick}
            style={{ cursor: 'pointer' }}
          >
            {/* BELANGRIJK: Pas het afbeeldingspad aan */}
            <img src="/img/cash.jpeg" className="payment-option__img" alt="Cash" />
            <div className="payment-option__label">Cash</div>
          </div>
          <div
            className="payment-option"
            // BELANGRIJK: Gebruik React's onClick event en de navigate functie
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            {/* BELANGRIJK: Pas het afbeeldingspad aan */}
            <img src="/img/card.jpg" className="payment-option__img" alt="Card" />
            <div className="payment-option__label">Card</div>
          </div>
        </div>
      </div>
    </div>
  );
}); // BELANGRIJK: Vergeet de puntkomma hier niet na de sluitende haakjes!

export default Payment;