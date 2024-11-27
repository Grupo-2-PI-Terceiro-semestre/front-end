import React, { useState, useEffect } from 'react';
import './Banner.css'; // Importa o CSS correspondente

const Banner = ({ images, nomeEmpresa, endereco }) => {

  if (!images || images.length === 0) {
    return;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner-container">
      <div className="info-empresa">
        <div className={`banner-content ${isTransitioning ? 'fade' : ''}`}>
          <img
            src={images[currentImageIndex]}
            alt={`Imagem ${currentImageIndex + 1}`}
            className="banner-image"
          />
        </div>
        <div>
          <h3>{nomeEmpresa}</h3>
          <p>{endereco.logradouro}, {endereco.numero}, {endereco.cep}, {endereco.bairro}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
