import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TakeAway = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="take-away-page-wrapper" ref={ref}>
      <div className="buttons">
        <div
          className="buttons__button"
          onClick={goToMenu}
          style={{ cursor: 'pointer' }}
        >
          <img src="/img/eat in uitgeknipt.png" alt="Image 1" className="buttons__image" />
          <p className="buttons__text">Eat In</p>
        </div>
        <div
          className="buttons__button"
          onClick={goToMenu}
          style={{ cursor: 'pointer' }}
        >
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
    </div>
  );
});

export default TakeAway;
