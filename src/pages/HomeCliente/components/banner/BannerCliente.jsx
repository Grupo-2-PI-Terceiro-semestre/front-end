import React, { useState, useEffect } from 'react';
import './BannerCliente.css';
import { findByServicoOuEmpresa } from '../../../../services/homeClienteServices';

const BannerCliente = ({ onSearchResults, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setLoading(true);
    buscarServico('ba')
  }, []);

  const handleKeyUp = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    buscarServico(value);
  };

  const buscarServico = async (value) => {
    try {
      setLoading(true);
      const response = await findByServicoOuEmpresa(value);
      onSearchResults(response);
    } catch (error) {
      console.error("Erro ao buscar serviços ou empresas", error);
    } finally {
      setLoading(false)
    }
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
