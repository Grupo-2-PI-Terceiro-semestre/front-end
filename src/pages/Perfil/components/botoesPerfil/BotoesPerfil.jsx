import React from 'react';
import { FaUser, FaMapMarkerAlt, FaClock, FaBell } from 'react-icons/fa'; 
import './BotoesPerfil.css';

function BotoesPerfil({ activeButton, setActiveButton }) {
  const handleButtonClick = (button) => {
    setActiveButton(button); 
  };

  return (
    <div className="subMenu">
      <div 
        className={`button ${activeButton === 'dados' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('dados')}
      >
        <FaUser className="icon" /> Dados Principais
      </div>
      <div 
        className={`button ${activeButton === 'localizacao' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('localizacao')}
      >
        <FaMapMarkerAlt className="icon" /> Localização
      </div>
      <div 
        className={`button ${activeButton === 'horario' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('horario')}
      >
        <FaClock className="icon" /> Horário de Funcionamento
      </div>
      <div 
        className={`button ${activeButton === 'notificacoes' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('notificacoes')}
      >
        <FaBell className="icon" /> Notificações
      </div>
    </div>
  );
}

export default BotoesPerfil;
