import React from 'react';
import './ServiceList.css';

function ServiceList() {
  const services = [
    { name: 'Corte Masculino', price: '45,00', duration: '00:45' },
    { name: 'Luzes', price: '45,00', duration: '00:45' },
    { name: 'Limpeza de pele', price: '45,00', duration: '00:45' },
    { name: 'Pézinho', price: '45,00', duration: '00:45' },
    { name: 'Sobrancelha', price: '45,00', duration: '00:45' },
  ];

  return (
    <div className="service-list">
      <h1>Serviços</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar Por Serviço"
          className="service-search"
        />
      </div>
      <ul className="service-container">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <div className="service-details">
              <span className="service-name">{service.name}</span>
            </div>
            <div className="service-info">
              <span className="service-price">R$ {service.price}</span>
              <span className="service-duration">{service.duration}</span>
              <button className="service-button">Reservar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceList;
