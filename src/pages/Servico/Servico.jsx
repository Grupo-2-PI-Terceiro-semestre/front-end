import React from "react";
import './Servico.css';
import HeaderInterna from "../../components/headerInterna/HeaderInterna";
import TelaServicos from "./components/telaServicos/TelaServicos";
import Menu from "../../components/menu/Menu";
// import IconBreadcrumbs from "../../components/breadcrumb/Breadcrumb";

function Servico() {
    const activeMenuItem = 'Serviços';
    return (
        <>
            <div className="main-servico">
                <Menu activeMenuItem={activeMenuItem} />
                <div className="container-servico">
                    <div className="principal-servico">
                        {/* <IconBreadcrumbs
                            paths={[
                                { label: 'Serviço', href: '/servico' }
                            ]}
                        /> */}

                        <div className="titulo-servico">
                            <div className="container-titulo-servico">
                                <h3>Serviços</h3>
                                <HeaderInterna texto="Novo Serviço" />
                            </div>
                        </div>

                        {/* <HeaderInterna texto="Novo Serviço" /> */}
                        <TelaServicos titulo="Serviços" placeholder="Pesquisar serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO" titulo4="CATEGORIA" titulo5="AÇÕES" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Servico;