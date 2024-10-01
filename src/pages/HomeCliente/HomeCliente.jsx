import React from "react";
import './HomeCliente.css';
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import BannerCliente from "./components/banner/BannerCliente";
import MenuCategorias from "./components/categorias/MenuCategorias";
import IntroCliente from "./components/Intro/IntroCliente";
import CardCliente from "./components/card/CardCliente";
import Localizacao from "./components/localizacao/Localizacao";
import Breve from "../../components/breve/Breve";
import FooterEmpresa from "../../components/footerEmpresa/FooterEmpresa";


function HomeCliente() {
    return <>
        <div className="main-homeCliente">
            <HeaderEmpresa
                navLinks={[
                    { name: 'Início', url: '/inicio' },
                    { name: 'Sobre', url: '/sobre' },
                    { name: 'Contato', url: '/contato' }
                ]}
                buttonText="Para Empresa"
                width="40vw" 
                widthOpcoes="40%"  
            />
            <BannerCliente />
            <MenuCategorias />
            <IntroCliente />
            <CardCliente />
            <Localizacao />
            <Breve />
            <FooterEmpresa showLinks={false} />
        </div>
    </>
}
    
export default HomeCliente;