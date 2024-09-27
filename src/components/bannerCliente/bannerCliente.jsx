import React from 'react';
import './BannerCliente.css';

const BannerCliente = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-content">
          <h1>Descubra e Escolha o melhor lugar para você!</h1>
          <div className="search-box">
            <input type="text" placeholder="Pesquise serviços ou empresa" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCliente;
