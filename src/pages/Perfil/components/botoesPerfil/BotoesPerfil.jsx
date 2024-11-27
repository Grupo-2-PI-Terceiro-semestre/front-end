import React from 'react';
import { FaUser, FaMapMarkerAlt, FaClock, FaBell } from 'react-icons/fa'; 
import { AiFillPicture } from "react-icons/ai";
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
        className={`button ${activeButton === 'galeria' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('galeria')}
      >
        <AiFillPicture className="icon" /> Galeria
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
