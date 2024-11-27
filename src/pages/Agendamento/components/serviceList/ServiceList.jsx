import React, { useState } from 'react';
import { formatDuration } from '../../../../utils/FormatDate';
import './ServiceList.css';

function ServiceList({ servicos, openModal }) {


  if (!servicos) return null;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = servicos.filter((service) =>
    service.nomeServico.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceClick = (service) => {
    openModal(service);
  }

  return (
    <div className="service-list">
      <h1>Serviços</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar Por Serviço"
          className="service-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="service-container">
        {filteredServices.map((service, index) => (
          <li key={index} className="service-item">
            <div className="service-details">
              <span className="service-name">{service.nomeServico}</span>
            </div>
            <div className="service-info">
              <span className="service-price">R$ {service.precoServico}</span>
              <span className="service-duration">{formatDuration(service.duracaoServico)}</span>
              <button onClick={() => handleServiceClick(service)} className="service-button">Reservar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
