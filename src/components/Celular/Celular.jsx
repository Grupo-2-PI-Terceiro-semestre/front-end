import React from 'react';
import './Celular.css'; // Importando o arquivo CSS
import celular from '../../assets/celular.png'


const Celular = () => {
  return (
    <div className="container">
      <div className="text-container">
        <h2>Em breve, estaremos disponíveis em seu smartphone:</h2>
        <div className="store-buttons">
          <a href="#" className="store-link">
            <img
              src="https://www.gov.br/pt-br/imagens-de-servicos/apple.png"
              alt="Download on the App Store"
              className="store-image"
            />
          </a>
          <a href="#" className="store-link">
            <img
              src="https://logodownload.org/wp-content/uploads/2017/04/disponivel-google-play-badge.png"
              alt="Download on the Play Store"
              className="store-image"
            />
          </a>
        </div>
      </div>
      
      <div className="image-container">
        {/* Substitua a URL abaixo pela URL da sua imagem */}
        <img
          src={celular}
          className="phone-image"
        />
      </div>
    </div>
  );
};

export default Celular;
