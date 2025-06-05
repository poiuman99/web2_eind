import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

const StartPage = React.forwardRef((props, ref) => {
  return (
    <div className="start-page-wrapper" ref={ref}>
      <Link to="/takeaway" className="start-page-link">
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
