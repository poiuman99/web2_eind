// src/components/ThankYou.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importeer de useCart hook

const ThankYou = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Haal clearCart op uit de context

  useEffect(() => {
    // Reset de winkelwagen zodra de ThankYou pagina laadt
    clearCart();

    // Stel de timer in voor de automatische navigatie
    const timer = setTimeout(() => {
      navigate('/'); // Navigeer naar de home page (aannemende dat '/' je home route is)
    }, 10000); // 5000 milliseconden = 5 seconden

    // Ruim de timer op als de component unmount voordat de 5 seconden om zijn
    return () => clearTimeout(timer);
  }, [navigate, clearCart]); // Voeg clearCart toe aan de dependency array

  const [countdown, setCountdown] = React.useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="start-page-wrapper" ref={ref}>
      <Link to="/menu" className="start-page-link">
        <div className="start-page-content">
          {/* Logo optioneel */}
          {/* <img src="/img/your-logo.png" alt="Logo" className="start-page-logo" /> */}

          <div className="start-page-text">
            <p className="order-screen__title">THANK YOU FOR YOUR ORDER!</p>
            <p className="order-screen__instruction">ENJOY YOUR MEAL!</p>
          </div>

          <img src="/img/frietman3-uitgeknipt.png" alt="Fries Mascot" className="start-page-mascot" />

      
          <p className="start-page-countdown">
            Returning to home in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </Link>
    </div>
  );
});

export default ThankYou;