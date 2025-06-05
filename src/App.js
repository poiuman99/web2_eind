import React from 'react';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './App.css';
import './css/main.css';
import './css/transitions.css';

import Header from './components/Header';

import StartPage from './components/StartPage';
import MenuPage from './components/MenuPage';
import Order from './components/Order';
import Payment from './components/Payment';
import ThankYou from './components/ThankYou';
import TakeAway from './components/TakeAway';

import { CartProvider } from './context/CartContext';
import { InactivityTimerProvider, useInactivityTimer } from './context/InactivityTimerContext';

const routes = [
  { path: '/', name: 'StartPage', Component: StartPage, nodeRef: React.createRef() },
  { path: '/takeaway', name: 'TakeAway', Component: TakeAway, nodeRef: React.createRef() },
  { path: '/menu', name: 'MenuPage', Component: MenuPage, nodeRef: React.createRef() },
  { path: '/order', name: 'Order', Component: Order, nodeRef: React.createRef() },
  { path: '/payment', name: 'Payment', Component: Payment, nodeRef: React.createRef() },
  { path: '/thankyou', name: 'ThankYou', Component: ThankYou, nodeRef: React.createRef() },
];

function App() {
  const _location = useLocation();
  const currentRoute = routes.find((route) => route.path === _location.pathname);

  return (
    <div className="app-container">
      <Header />
      <CartProvider>
        <InactivityTimerProvider>
          <main className="app-main-content">
            <SwitchTransition>
              <CSSTransition
                key={_location.pathname}
                nodeRef={currentRoute ? currentRoute.nodeRef : null}
                classNames="fade"
                timeout={300}
              >
                <div className="page-wrapper">
                  <Routes location={_location}>
                    {routes.map(({ path, Component, nodeRef }) => (
                      <Route
                        key={path}
                        path={path}
                        element={<Component ref={nodeRef} />}
                      />
                    ))}
                  </Routes>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </main>
          <InactivityWarningModal />
        </InactivityTimerProvider>
      </CartProvider>
    </div>
  );
}

const InactivityWarningModal = () => {
  const { showWarning } = useInactivityTimer();

  if (!showWarning) return null;

  return (
    <div className="inactivity-warning-overlay">
      <div className="inactivity-warning-modal">
        <h2>Session expires</h2>
        <p>Your session will restart shortly due to inactivity.</p>
        <p>Touch the screen to continue.</p>
      </div>
    </div>
  );
};

export default App;
