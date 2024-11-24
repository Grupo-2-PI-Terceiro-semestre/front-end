import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PerfilEmpresa.css';
import HeaderAgendamento from "./components/headerAgendamento/HeaderAgendamento";
import ServiceList from "./components/serviceList/ServiceList";
import Banner from "./components/banner/Banner";
import Map from "./components/map/Map";
import { buscarDadosDePerfil } from './services/perfilEmpresa';
import ModalAgendamento from "./components/modalAgendamento/ModalAgendamento";
import LoadingDots from "../HomeCliente/components/loading/LoadingDots"; // Importa o componente de loading

function PerfilEmpresa() {
  const { idEmpresa } = useParams();
  const [empresa, setEmpresa] = useState({});
  const [imagens, setImagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    buscarEmpresa(idEmpresa);
  }, [idEmpresa]);

  const buscarEmpresa = async () => {
    setIsLoading(true);
    try {
      const response = await buscarDadosDePerfil(idEmpresa);
      setEmpresa(response);
      const imagensUrls = response.imagems.map(imagem => imagem.urlImagem);
      setImagens(imagensUrls);
    } catch (error) {
      console.error("Erro ao buscar empresa", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (servico) => {
    setServicoSelecionado(servico);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-agendamento">
      <HeaderAgendamento />
      {isLoading ? (
        <div className="loading-container">
          <LoadingDots size={35} />
        </div>
      ) : (
        <div className="sessao">
          <div className="banner-map">
            <Banner images={imagens} nomeEmpresa={empresa.nomeEmpresa} endereco={empresa.endereco} />
            <Map endereco={empresa.endereco} />
          </div>
          <ServiceList servicos={empresa.servicos} openModal={openModal} />
        </div>
      )}

      {isModalOpen && (
        <ModalAgendamento
          onClose={closeModal}
          servico={servicoSelecionado}
          equipe={empresa.usuario || []}
        />
      )}
    </div>
  );
}

export default PerfilEmpresa;
