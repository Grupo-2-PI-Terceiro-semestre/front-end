import React from 'react';
import './Header.css'; // Arquivo CSS para estilização
import Barra from '../../../../components/barra-load/LinearProgress';

const Header = ({barraVisible}) => {
  return (

    <header className="header-login">
      <div className="logo-container">
        <a href="/empresa" className="logo-link">
          OrderHub
        </a>
      </div>
      <div className='barra-container'id='barra-container' style={{display: barraVisible?'block':'none'}}><Barra></Barra></div>
    </header>
  );
};

export default Header;
