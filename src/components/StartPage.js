// src/components/StartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // Zorg dat dit bestand wordt geïmporteerd

const StartPage = React.forwardRef((props, ref) => {
  return (
    // De 'start-page-wrapper' is de hoofdcontainer voor je StartPage inhoud.
    // De ref wordt hierop gezet voor CSSTransition.
    <div className="start-page-wrapper" ref={ref}>
      {/* De Link component wikkelt de hele inhoud en maakt deze klikbaar */}
      <Link to="/takeaway" className="start-page-link">
        {/* Deze div bevat de centrale inhoud van de startpagina */}
        <div className="start-page-content">

         

          <div className="start-page-text">
            <p className="start-page-order-text">ORDER</p>
            <p className="start-page-here-text">HERE</p>
          </div>

          <img src="/img/frietman3-uitgeknipt.png" alt="Fries Mascot" className="start-page-mascot" />

          <p className="start-page-instruction">Click anywhere on the screen.</p>
        </div>
      </Link>
    </div>
  );
});

export default StartPage;