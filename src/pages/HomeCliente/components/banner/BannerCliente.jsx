import React, { useState } from 'react'; // Importando useState
import './BannerCliente.css';
import { findByServicoOuEmpresa } from '../../../../services/homeClienteServices';

const BannerCliente = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Inicializando o estado

  const handleKeyUp = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    findByServicoOuEmpresa(value); // Chama a função com o valor atual
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Descubra e Escolha o melhor lugar para você!</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Pesquise serviços ou empresa"
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerCliente;
