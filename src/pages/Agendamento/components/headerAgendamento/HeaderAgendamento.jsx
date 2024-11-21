import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import './HeaderAgendamento.css';

const HeaderAgendamento = () => {
  return (
    <div className="header-agendamento">
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
      <div className="nav-links">
        <span className="brand-name">Order Hub</span>
        <a href="#inicio">Início</a>
        <a href="#solicite">Solicite</a>
        <a href="#contato">Contato</a>
      </div>
      <div className="business-link">
      </div>
    </div>
  );
};

export default HeaderAgendamento;
