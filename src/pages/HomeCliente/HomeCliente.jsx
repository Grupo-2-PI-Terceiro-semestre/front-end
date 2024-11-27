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

function HomeCliente() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);

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

    const openLoginModal = () => setIsLoginModalOpen(true);
    const openCadastroModal = () => setIsCadastroModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const closeCadastroModal = () => setIsCadastroModalOpen(false);

    return (
        <>
            <div className="main-homeCliente">
                <HeaderEmpresa
                    buttonText="Para Empresa"
                    url="/empresa"
                    width="30vw"
                    widthOpcoes="0"
                    onLoginClick={openLoginModal}
                    onCadastroClick={openCadastroModal}
                    isHomeCliente={true}
                    isButtonVisible={true}
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
        </>
    );
}

export default HomeCliente;
