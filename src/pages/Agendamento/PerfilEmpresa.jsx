import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PerfilEmpresa.css';
import ServiceList from "./components/serviceList/ServiceList";
import Banner from "./components/banner/Banner";
import Map from "./components/map/Map";
import { buscarDadosDePerfil } from './services/perfilEmpresa';
import ModalAgendamento from "./components/modalAgendamento/ModalAgendamento";
import LoadingDots from "../HomeCliente/components/loading/LoadingDots";
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import CadastroForm from "../HomeCliente/components/modal-cadastro/CadastroForm";
import LoginForm from "../HomeCliente/components/modal-login/LoginForm";
import ModalAgendaCliente from "../HomeCliente/components/modal-agenda-cliente/ModalAgendaCliente";


function PerfilEmpresa() {
  const { idEmpresa } = useParams();
  const [empresa, setEmpresa] = useState({});
  const [imagens, setImagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const openAgendaModal = () => setIsAgendaModalOpen(true);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const openCadastroModal = () => setIsCadastroModalOpen(true);
  const closeAgendaModal = () => setIsAgendaModalOpen(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeCadastroModal = () => setIsCadastroModalOpen(false);

  const openModal = (servico) => {
    setServicoSelecionado(servico);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-agendamento">
      <HeaderEmpresa
        buttonText="Voltar"
        url="/"
        width="30vw"
        widthOpcoes="0"
        onLoginClick={openLoginModal}
        onCadastroClick={openCadastroModal}
        onAgendaClick={openAgendaModal}
        isButtonVisible={true}
        isHomeCliente={false}
      />
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

      {isLoginModalOpen && (
        <LoginForm onClose={closeLoginModal} />
      )}
      {isCadastroModalOpen && (
        <CadastroForm onClose={closeCadastroModal} />
      )}
      {isAgendaModalOpen && (
        <ModalAgendaCliente onClose={closeAgendaModal} />
      )}
      
    </div>
  );
}

export default PerfilEmpresa;
