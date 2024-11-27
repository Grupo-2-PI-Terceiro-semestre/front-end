import React from 'react';
import './Map.css';

const Map = ({ endereco }) => {

  if (!endereco) {
    return;
  }

  const address = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf},`;

  return (
    <iframe
      title="Mapa"
      src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
      width="480"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  );
};

export default Map;
