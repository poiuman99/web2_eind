// src/components/StartPage.js
import React from 'react'; // Zorg dat React is geïmporteerd
import { Link } from 'react-router-dom';
// import '../css/startpage.css'; // Als je specifieke CSS hebt voor deze pagina

// DEZE LIJN IS NIET MEER NODIG: `function StartPage() {`
// Je definieert StartPage al direct met React.forwardRef

// BELANGRIJK: DEZE IS DE CORRECTE MANIER OM JE COMPONENT TE DEFINIËREN MET forwardRef
// StartPage is een constante die de returnwaarde van React.forwardRef is
const StartPage = React.forwardRef((props, ref) => { // 'props' en 'ref' moeten hier staan
  return (
    // BELANGRIJK: Pas de ref toe op het TOP-LEVEL DOM-element van deze component
    // In dit geval is de Link al het top-level clickable element
    <Link to="/takeaway" className="startpage-link-wrapper" ref={ref}>
      {/* <section className="order-screen" >  <-- Deze section heeft geen ref nodig omdat de Link hem al wikkelt */}

      {/* De onclick="location.href='takeAway.html';" moet VERWIJDERD WORDEN.
          De <Link> component doet dit al voor je in React.
          De div is al klikbaar via de <Link> wrapper. */}
      <div className="order-screen__container" style={{ cursor: 'pointer' }}>
        {/* BELANGRIJK: Afbeeldingpaden moeten beginnen met een `/` als ze in de `public` map staan */}
        <img src="/img/logo3-uitgeknipt beter copy.png" alt="Jetreken Logo" className="order-screen__logo" />

        <div className="order-screen__text">
          <p className="order-screen__order">ORDER</p>
          <p className="order-screen__here">HERE</p>
        </div>

        <img src="/img/frietman3-uitgeknipt.png" alt="Fries Mascot" className="order-screen__mascot" />

        <p className="order-screen__instruction">Click anywhere on the screen.</p>
      </div>
      {/* </section> */} {/* <-- Sluitende tag die nu niet nodig is */}
    </Link>
  );
}); // <--- BELANGRIJK: HIER KOMT DE PUNTKOMMA!

// De export default staat hier correct.
export default StartPage; 