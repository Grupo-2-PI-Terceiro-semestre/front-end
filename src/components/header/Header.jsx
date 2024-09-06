import React from 'react';
import './Header.css'; // Arquivo CSS para estilização

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-link">
          OrderHub
        </a>
      </div>
    </header>
  );
};

export default Header;
