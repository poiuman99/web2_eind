import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ThankYou = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

  const [countdown, setCountdown] = React.useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="thankyou-page-wrapper" ref={ref}>
      <div className="thankyou-page-content">
        <div className="thankyou-page-text">
          <p className="thankyou-title">THANK YOU FOR YOUR ORDER!</p>
          <p className="thankyou-instruction">ENJOY YOUR MEAL!</p>
        </div>
        <img src="/img/frietman3-uitgeknipt.png" alt="Fries Mascot" className="thankyou-mascot" />
        <p className="thankyou-countdown">
          Returning to home in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
});

export default ThankYou;
