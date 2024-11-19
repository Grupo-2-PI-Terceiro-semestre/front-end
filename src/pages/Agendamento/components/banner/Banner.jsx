import React from 'react';
import './Banner.css'; // Importa o CSS correspondente

const Banner = () => {
  return (
    <div className="banner-container">
     <div className="info-empresa">
       <div className="banner-content">
        <img
          src="https://www.goldhairmoveis.com.br/wp-content/uploads/2016/11/excelencia-no-salao-de-beleza.jpg"
          alt="Salão de beleza"
          className="banner-image"
        />
      </div>
        <div>
             <h3>Barbearia NK</h3>
             <p>Avenida Perimetral Sul, 606, 78645-000, Vila Rica</p>
      </div>
      
      </div>

     
    </div>
  );
};

export default Banner;
