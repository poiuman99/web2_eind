// src/App.js
import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Link is niet nodig hier
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './App.css';
import './css/main.css';
import './css/transitions.css';

import Header from './components/Header';
import Footer from './components/Footer';

// Importeer al je "pagina"-componenten hier
import StartPage from './components/StartPage';
import MenuPage from './components/MenuPage';
import Order from './components/Order';
import Payment from './components/Payment';
import ThankYou from './components/ThankYou';
import TakeAway from './components/TakeAway';

// DEFINIEER JE ROUTES ARRAY HIER, MET nodeRef VOOR ELKE COMPONENT
const routes = [
  { path: '/', name: 'StartPage', Component: StartPage, nodeRef: React.createRef() },
  { path: '/takeaway', name: 'TakeAway', Component: TakeAway, nodeRef: React.createRef() },
  { path: '/menu', name: 'MenuPage', Component: MenuPage, nodeRef: React.createRef() },
  { path: '/order', name: 'Order', Component: Order, nodeRef: React.createRef() }, // Zorg dat Order ook forwardRef heeft
  { path: '/payment', name: 'Payment', Component: Payment, nodeRef: React.createRef() }, // Zorg dat Payment ook forwardRef heeft
  { path: '/thankyou', name: 'ThankYou', Component: ThankYou, nodeRef: React.createRef() }, // Zorg dat ThankYou ook forwardRef heeft
];

function App() {
  const _location = useLocation();

  // Vind de huidige route en bijbehorende ref
  const currentRoute = routes.find((route) => route.path === _location.pathname);

  return (
    <div className="App">
      <Header />

      <SwitchTransition>
        <CSSTransition
          key={_location.pathname}
          nodeRef={currentRoute ? currentRoute.nodeRef : null} // <<-- DEZE IS CRUCIAAL!
          classNames="fade"
          timeout={300}
        >
          {/* Geef 'location' door aan Routes, belangrijk voor SwitchTransition */}
          <Routes location={_location}> {/* <<-- DEZE IS OOK BELANGRIJK! */}
            {routes.map(({ path, Component, nodeRef }) => (
              <Route
                key={path}
                path={path}
                element={<Component ref={nodeRef} />} // <<-- REF WORDT HIER DOORGEGEVEN
              />
            ))}
          </Routes>
        </CSSTransition>
      </SwitchTransition>

      <Footer />
    </div>
  );
}

export default App;

