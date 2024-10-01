import React from "react";
import './Servico.css';
import HeaderInterna from "../../components/headerInterna/HeaderInterna";
import TelaServicos from "../../components/telaServicos/TelaServicos";
import MenuPerfil from "../../components/menuPerfil/MenuPerfil";

function Servico() {

    return (
        <>
        <div className="main-servico">
            <div className="container-servico">
                <div className="menu-lateral">
                    <MenuPerfil />
                </div>                
                <div className="principal">
                    <HeaderInterna texto="Novo Serviço"  />
                    <TelaServicos titulo="Serviço" placeholder="Pesquisar Serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO DE EXECUÇÃO" titulo4="AÇÕES" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Servico;