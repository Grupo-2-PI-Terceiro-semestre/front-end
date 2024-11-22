import React from 'react';
import './Map.css';

const Map = () => {
  const address = "Rua Haddock Lobo, 595 - Cerqueira César, São Paulo - SP,";

  return (
    <iframe
      title="Mapa"
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
