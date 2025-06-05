import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const InactivityTimerContext = createContext();

export const useInactivityTimer = () => useContext(InactivityTimerContext);

export const InactivityTimerProvider = ({ children }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const INACTIVITY_TIMEOUT = 30 * 1000;
  const WARNING_DURATION = 5 * 1000;

  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);

    timerRef.current = setTimeout(() => {
      setShowWarning(true);
      warningTimerRef.current = setTimeout(() => {
        resetSession();
      }, WARNING_DURATION);
    }, INACTIVITY_TIMEOUT);
  }, [INACTIVITY_TIMEOUT, WARNING_DURATION]);

  const resetSession = useCallback(() => {
    clearCart();
    navigate('/');
    setShowWarning(false);
    resetTimer();
  }, [clearCart, navigate, resetTimer]);

  useEffect(() => {
    resetTimer();
    const activityEvents = ['mousemove', 'keypress', 'touchstart', 'scroll', 'click'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer]);

  const value = {
    showWarning,
    resetSession,
  };

  return (
    <InactivityTimerContext.Provider value={value}>
      {children}
    </InactivityTimerContext.Provider>
  );
};
