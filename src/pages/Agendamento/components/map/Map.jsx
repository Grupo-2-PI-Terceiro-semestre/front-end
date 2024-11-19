import React from 'react';
import './Map.css';

const Map = () => {
  return (
        <iframe
          title="Mapa de São Paulo"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.796519319821!2d-46.64869242397025!3d-23.558631265159013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b5980b083b%3A0x4b537ff0c1dbf6ab!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1638352211787!5m2!1spt-BR!2sbr"
          width="400"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
  );
};

export default Map;
