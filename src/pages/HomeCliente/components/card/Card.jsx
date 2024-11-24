// CardCliente.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './CardCliente.css';

const Card = ({ card }) => {
  const navigate = useNavigate(); // Hook para navegação

  if (!card) return null;

  const random = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  const handleCardClick = () => {
    navigate(`/perfil/empresa/${card.idEmpresa}`);
  };

  return (
    <div className="card-cliente" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={card.urlLogo} alt={card.nomeEmpresa} className="card-img" />
      <div className="card-content">
        <div className="info-endereco">
          <p>Jd Record - SP</p>
        </div>
        <h3>{card.nomeEmpresa}</h3>
        <h5>{card.categoria}</h5>
        <p>
          <strong>Principais Serviços:</strong>
          {card.servicos.slice(0, 3).map((servico, index) => (
            <span key={index}>{servico}{index < 2 ? ', ' : ''}</span>
          ))}
        </p>
        <div className="rating">{'★'.repeat(random || 0)}</div>
      </div>
    </div>
  );
};

export default Card;
