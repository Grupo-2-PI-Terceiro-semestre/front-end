import React from "react";
import './Equipe.css';
import Menu from "../../components/menu/Menu";
import HeaderInterna from "./components/headerInterna/HeaderInterna";
import TelaEquipe from "./components/telaEquipe/TelaEquipe";

function Equipe() {
    const activeMenuItem = 'Equipe';
    return (
        <div className="main-equipe">
            <Menu activeMenuItem={activeMenuItem} />
            <div className="container-equipe">

                <div className="principal-equipe">

                    <div className="titulo-equipe">
                        <div className="container-titulo-equipe">
                            <h3>Equipe</h3>
                            <HeaderInterna texto="Novo Colaborador" />
                        </div>
                    </div>

                    <TelaEquipe titulo="Serviços" placeholder="Pesquisar colaborador" titulo1="NOME" titulo2="TELEFONE" titulo3="E-MAIL" titulo4="FUNÇÃO" titulo5="AÇÕES" />
                </div>

            </div>
        </div>
    )
}

export default Equipe;