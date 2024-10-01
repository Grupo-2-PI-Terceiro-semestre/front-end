import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaChartBar, FaUsers, FaBriefcase, FaSignOutAlt, FaServicestack } from 'react-icons/fa';
import './MenuPerfil.css'; 

const MenuPerfil = () => {
  const [activeItem, setActiveItem] = useState('Perfil'); 

  const handleItemClick = (item) => {
    setActiveItem(item); 
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Imagem de Perfil" className="profile-image" />
        <span className="profile-name">Nome do Usuário</span>
      </div>
      <ul>
        <li className={activeItem === 'Agenda' ? 'active' : ''} onClick={() => handleItemClick('Agenda')}>
          <FaCalendarAlt />
          <span>Agenda</span>
        </li>
        <li className={activeItem === 'Perfil' ? 'active' : ''} onClick={() => handleItemClick('Perfil')}>
          <FaUser />
          <span>Perfil</span>
        </li>
        <li className={activeItem === 'Dashboard' ? 'active' : ''} onClick={() => handleItemClick('Dashboard')}>
          <FaChartBar />
          <span>Dashboard</span>
        </li>
        <li className={activeItem === 'Equipe' ? 'active' : ''} onClick={() => handleItemClick('Equipe')}>
          <FaUsers />
          <span>Equipe</span>
        </li>
        <li className={activeItem === 'Clientes' ? 'active' : ''} onClick={() => handleItemClick('Clientes')}>
          <FaBriefcase />
          <span>Clientes</span>
        </li>
        <li className={activeItem === 'Serviços' ? 'active' : ''} onClick={() => handleItemClick('Serviços')}>
          <FaServicestack />
          <span>Serviços</span>
        </li>
      </ul>
      <div className="logout">
        <FaSignOutAlt />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default MenuPerfil;
