import React from "react";
import './Servico.css';
// import HeaderInterna from "../../components/headerInterna/HeaderInterna";
import TelaServicos from "./components/telaServicos/TelaServicos";
import Menu from "../../components/menu/Menu";
import HeaderServico from "./components/headerServico/HeaderServico";

function Servico() {
    const activeMenuItem = 'Serviços';
    return (
        <>
            <div className="main-servico">
                <Menu activeMenuItem={activeMenuItem} />
                <div className="container-servico">
                    <div className="principal-servico">

                        <div className="titulo-servico">
                            <div className="container-titulo-servico">
                                <h3>Serviços</h3>
                                <HeaderServico texto="Novo Serviço" />
                            </div>
                        </div>

                        <TelaServicos titulo="Serviços" placeholder="Pesquisar serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO" titulo4="AÇÕES" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Servico;