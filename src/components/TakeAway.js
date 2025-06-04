// src/components/TakeAway.js

import React from 'react';
// Importeer Link en useNavigate van react-router-dom voor navigatie
import { Link, useNavigate } from 'react-router-dom';

// Importeer hier eventuele CSS voor TakeAwayPage:
// import '../css/takeaway.css'; // Als je een specifieke CSS hebt
// import '../css/menu.css';    // Als deze CSS de stijlen voor de 'buttons' bevat

// BELANGRIJK: Wikkel de componentdefinitie in React.forwardRef
const TakeAway = React.forwardRef((props, ref) => {
  // Gebruik de useNavigate hook voor programmatische navigatie (bijv. op een div klik)
  const navigate = useNavigate();

  // Functie om naar de menupagina te navigeren
  // LET OP: Ik ga ervan uit dat je een route '/menu' zult aanmaken voor je MenuPage.js
  const goToMenu = () => {
    navigate('/menu');
  };

  return (
    // BELANGRIJK: Vervang de React Fragment (<>...</>) met een echt DOM-element (bijv. <div> of <section>)
    // en pas de 'ref' toe op dit buitenste element. Dit is cruciaal voor de animaties.
    <div className="take-away-page-wrapper" ref={ref}>
      {/* HEADER */}
      

      {/* TERUGKNOP: Gebruik Link component voor interne navigatie */}
      {/* Ik ga ervan uit dat 'index.html' nu de root-route '/' is in React Router */}
      <Link to="/" className="payment__back-button">&larr; Back</Link>

      {/* KNOPPEN VOOR 'EAT IN' EN 'TAKE AWAY' */}
      <div className="buttons">
        <div
          className="buttons__button"
          // BELANGRIJK: Gebruik React's onClick event en de navigate functie
          onClick={goToMenu}
          style={{ cursor: 'pointer' }}
        >
          {/* BELANGRIJK: Pas het afbeeldingspad aan */}
          <img src="/img/eat in uitgeknipt.png" alt="Image 1" className="buttons__image" />
          <p className="buttons__text">Eat In</p>
        </div>
        <div
          className="buttons__button"
          // BELANGRIJK: Gebruik React's onClick event en de navigate functie
          onClick={goToMenu}
          style={{ cursor: 'pointer' }}
        >
          {/* BELANGRIJK: Pas het afbeeldingspad aan */}
          <img src="/img/images.png" alt="Image 2" className="buttons__image" />
          <p className="buttons__text">Take Away</p>
        </div>
      </div>

      
        <div className="languages">
          <h2 className="languages__title">Select Language</h2>
          <div className="languages__button">
            <img src="/img/vlag uk.png" alt="English flag" className="languages__flag" /><br />
            English
          </div>
          <div className="languages__button">
            <img src="/img/vlag nederland.webp" alt="Dutch flag" className="languages__flag" /><br />
            Dutch
          </div>
          <div className="languages__button">
            <img src="/img/flag frankrijk.png" alt="French flag" className="languages__flag" /><br />
            French
          </div>
        </div>
          </div> // Sluitende tag voor de nieuwe wrapper-div
  );
}); // BELANGRIJK: Vergeet de puntkomma hier niet na de sluitende haakjes!

export default TakeAway;