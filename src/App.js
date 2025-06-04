// src/App.js
import React from 'react'; // useRef is hier niet direct gebruikt in App.js JSX
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './App.css'; // Je algemene App.css, indien aanwezig
import './css/main.css'; // De belangrijkste CSS-file
import './css/transitions.css'; // Voor CSSTransition animaties

import Header from './components/Header'; // ZORG DAT DEZE BESTAAT EN JUIST IS


// Importeer al je "pagina"-componenten hier
import StartPage from './components/StartPage';
import MenuPage from './components/MenuPage';
import Order from './components/Order';
import Payment from './components/Payment';
import ThankYou from './components/ThankYou';
import TakeAway from './components/TakeAway';

// Importeer de CartProvider
import { CartProvider } from './context/CartContext';

// DEFINIEER JE ROUTES ARRAY HIER, MET nodeRef VOOR ELKE COMPONENT
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
      <Header /> {/* JE HEADER COMPONENT HIER TOEVOEGEN */}

      <CartProvider>
        {/* De 'app-main-content' zal de resterende ruimte tussen Header en Footer opvullen */}
        <main className="app-main-content">
          <SwitchTransition>
            <CSSTransition
              key={_location.pathname}
              nodeRef={currentRoute ? currentRoute.nodeRef : null}
              classNames="fade"
              timeout={300}
            >
              {/* Deze div zorgt ervoor dat de content binnen CSSTransition een direct element heeft
                  en de full height van de app-main-content pakt. */}
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
      </CartProvider>

      
    </div>
  );
}

export default App;