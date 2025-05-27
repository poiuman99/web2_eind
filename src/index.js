// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Als je een globale index.css hebt
import App from './App';
// VOEG DEZE LIJN TOE:
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* WIKKEL JE APP COMPONENT IN DE BROWSERROUTER */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 
