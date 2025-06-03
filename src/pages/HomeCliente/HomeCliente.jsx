import React, { useState } from "react";
import "./HomeCliente.css";
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import BannerCliente from "./components/banner/BannerCliente";
import IntroCliente from "./components/Intro/IntroCliente";
import Localizacao from "./components/localizacao/Localizacao";
import MenuCategorias from "./components/categorias/MenuCategorias";
import Breve from "../../components/breve/Breve";
import FooterEmpresa from "../../components/footerEmpresa/FooterEmpresa";
import Carousel from './components/card/Carousel ';
import LoginForm from "./components/modal-login/LoginForm";
import CadastroForm from "./components/modal-cadastro/CadastroForm";
import ModalAgendaCliente from "./components/modal-agenda-cliente/ModalAgendaCliente";

function HomeCliente() {
    let next = 'cliente';
    localStorage.setItem('lastHomeType', next);

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);


    const handleSearchResults = (results) => {
        setIsLoading(false);
        if (!results) return;
        setSearchResults(results);
    };

    const handleFilterResults = (results) => {
        setIsLoading(false);
        if (!results) return;
        setSearchResults(results);
    };

    const openAgendaModal = () => setIsAgendaModalOpen(true);
    const openLoginModal = () => setIsLoginModalOpen(true);
    const openCadastroModal = () => setIsCadastroModalOpen(true);

    const closeLoginModal = () => setIsLoginModalOpen(false);
    const closeCadastroModal = () => setIsCadastroModalOpen(false);
    const closeAgendaModal = () => setIsAgendaModalOpen(false);

    return (
        <>
            <div className="main-homeCliente">
                <HeaderEmpresa
                    buttonText="Para Empresa"
                    url="/empresa"
                    width="30vw"
                    widthOpcoes="0"
                    isHomeCliente={true}
                    isButtonVisible={true}
                    onLoginClick={openLoginModal}
                    onCadastroClick={openCadastroModal}
                    onAgendaClick={openAgendaModal}
                />
                <BannerCliente
                    onSearchResults={handleSearchResults}
                    setLoading={setIsLoading}
                />
                <MenuCategorias
                    onSearchResults={handleFilterResults}
                    setLoading={setIsLoading}
                />
                <Carousel cards={searchResults} isLoading={isLoading} />
                <IntroCliente />
                <Localizacao />
                <Breve />
                <FooterEmpresa showLinks={false} />
            </div>

            {isLoginModalOpen && (
                <LoginForm onClose={closeLoginModal} />
            )}
            {isCadastroModalOpen && (
                <CadastroForm onClose={closeCadastroModal} />
            )}
            {isAgendaModalOpen && (
                <ModalAgendaCliente onClose={closeAgendaModal} />
            )}
        </>
    );
}

export default HomeCliente;
