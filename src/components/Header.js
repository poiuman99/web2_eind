// src/components/Header.js
import React from 'react';
import '../css/Header.css'; // Als Header.css in src/css/ staat

function Header() {
  return (
    <header className="main-header">
      <nav>
        {/* Kopieer hier je HTML voor de navigatiebalk */}
        <a href="/">Home</a>
        <a href="/about">Over ons</a>
        {/* ... meer navigatie links */}
      </nav>
    </header>
  );
}

export default Header;