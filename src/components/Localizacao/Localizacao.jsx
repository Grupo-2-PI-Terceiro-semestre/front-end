import React, { useState } from 'react';
import './Localizacao.css';

const Localizacao = () => {
  const [locationPermission, setLocationPermission] = useState(null);

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          setLocationPermission(true);
        },
        () => {
          alert('Localização não permitida.');
          setLocationPermission(false);
        }
      );
    } else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  };

  const handleDenyLocation = () => {
    setLocationPermission(false);
    alert('Você optou por não ativar os serviços de localização.');
  };

  return (
    <div className="location-container">
      <h1 className="title">Ativar serviços de localização</h1>
      <p className="subtitle">
        Receba recomendações de grandes empresas! Ative os serviços de localização para que possamos mostrar o que está por perto.
      </p>
      
      {/* Mapa com Google Maps */}
      <div className="map">
        <iframe
          title="Mapa de São Paulo"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.796519319821!2d-46.64869242397025!3d-23.558631265159013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b5980b083b%3A0x4b537ff0c1dbf6ab!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1638352211787!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      
      <div className="buttons-container">
        <button onClick={handleAllowLocation} className="allow-button">
          Pesquise perto de mim
        </button>
        <button onClick={handleDenyLocation} className="deny-button">
          Agora Não
        </button>
      </div>
      {locationPermission === true && <p>Serviços de localização ativados!</p>}
      {locationPermission === false && <p>Serviços de localização desativados.</p>}
    </div>
  );
};

export default Localizacao;
