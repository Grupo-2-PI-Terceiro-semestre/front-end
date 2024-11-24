import React, { useState, useEffect } from 'react';
import './HomeCliente.css';
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import BannerCliente from "./components/banner/BannerCliente";
import IntroCliente from "./components/Intro/IntroCliente";
import Localizacao from "./components/localizacao/Localizacao";
import MenuCategorias from "./components/categorias/MenuCategorias";
import Breve from "../../components/breve/Breve";
import FooterEmpresa from "../../components/footerEmpresa/FooterEmpresa";
import Carousel from './components/card/Carousel ';


function HomeCliente() {

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);




    const handleSearchResults = (results) => {
        setIsLoading(false);
        if (results == undefined || results == null) {
            return;
        }
        setSearchResults(results);
    };

    const handleFilterResults = (results) => {
        setIsLoading(false);
        if (results == undefined || results == null) {
            return;
        }
        setSearchResults(results);
    }

    return <>
        <div className="main-homeCliente">
            <HeaderEmpresa
                navLinks={[
                    { name: 'Login', url: 'cliente/login' },
                    { name: 'Cadastro', url: '/cliente/cadastro' }
                ]}
                buttonText="Para Empresa"
                url="/empresa"
                width="40vw"
                widthOpcoes="40%"
            />
            <BannerCliente
                onSearchResults={handleSearchResults}
                setLoading={setIsLoading}
            />
            <MenuCategorias
                onSearchResults={handleFilterResults}
                setLoading={setIsLoading}
            />
            <Carousel
                cards={searchResults}
                isLoading={isLoading}
            />
            <IntroCliente />
            <Localizacao />
            <Breve />
            <FooterEmpresa showLinks={false} />
        </div>
    </>
}

export default HomeCliente;