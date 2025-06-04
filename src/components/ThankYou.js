// src/components/ThankYou.js
import React from 'react';
// Importeer Link voor navigatie
import { Link } from 'react-router-dom';

// BELANGRIJK: Wikkel de componentdefinitie in React.forwardRef
const ThankYou = React.forwardRef((props, ref) => {
  return (
    // BELANGRIJK: Pas de 'ref' toe op het TOP-LEVEL DOM-element van deze component
    <div className="order-screen" ref={ref}>
      <div className="order-screen__container">
        {/* BELANGRIJK: Pas het afbeeldingspad aan als je img map in public/ staat. */}
        

        <div className="order-screen__text">
          <p className="order-screen__order">ENJOY YOUR MEAL</p>
          <p className="order-screen__thank-you">Thank you for your order!</p>
        </div>

        {/* BELANGRIJK: Pas het afbeeldingspad aan */}
        <img src="/img/frietman3-uitgeknipt.png" alt="Fries Mascot" className="order-screen__mascot" />

        {/* BELANGRIJK: Gebruik de Link component voor interne navigatie in React Router */}
        {/* Ik ga ervan uit dat '/payment' de route is naar je betaalpagina */}
        <Link to="/payment" className="order-screen__back-button">← Back</Link>
      </div>
    </div>
  );
}); // BELANGRIJK: Vergeet de puntkomma hier niet na de sluitende haakjes!

export default ThankYou;