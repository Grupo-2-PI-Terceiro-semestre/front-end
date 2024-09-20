import React from 'react';
import './SectionIcons.css';
import Icon1 from '../../assets/pentes.png';
import Icon2 from '../../assets/pente.png';
import Icon3 from '../../assets/secador.png';
import Icon4 from '../../assets/esmalte.png';
import Icon5 from '../../assets/aparar_barba.png';
import Icon6 from '../../assets/tesoura.png';
import Icon7 from '../../assets/maquiagem.png';

const SectionIcons = ({ titulo, texto, botao, onClick }) => {
  return (
    <div className="login-section">
      <div className='circle-container'>
        <img src={Icon1} alt="Ícone 1" className="circle-icon" />
        <img src={Icon2} alt="Ícone 2" className="circle-icon" />
        <img src={Icon3} alt="Ícone 3" className="circle-icon" />
        <img src={Icon4} alt="Ícone 4" className="circle-icon" />
        <img src={Icon5} alt="Ícone 5" className="circle-icon" />
        <img src={Icon6} alt="Ícone 6" className="circle-icon" />
        <img src={Icon7} alt="Ícone 7" className="circle-icon" />

        <div className='rosa'></div>
        <div className='azul'></div>
        
        <div className="text">
          <h1>{titulo}</h1>
          <p className='paragrafo'>{texto}</p>
          <button onClick={onClick} className="login-button">{botao}</button>
        </div>
      </div>
    </div>
  );
};

export default SectionIcons;
