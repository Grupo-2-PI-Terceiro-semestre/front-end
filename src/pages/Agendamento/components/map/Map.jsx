import React from 'react';
import './Map.css';

const Map = () => {
  const address = "Rua Carambeí, 67, São Paulo, SP";

  return (
    <iframe
      title="Mapa de Rua Carambeí"
      src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
      width="400"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  );
};

export default Map;
