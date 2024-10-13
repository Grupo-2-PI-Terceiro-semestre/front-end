import React from "react";
import './Servico.css';
// import HeaderInterna from "../../components/headerInterna/HeaderInterna";
import TelaServicos from "./components/telaServicos/TelaServicos";
import Menu from "../../components/menu/Menu";
import IconBreadcrumbs from "../../components/breadcrumb/Breadcrumb";

function Servico() {
    const activeMenuItem = 'Serviços';
    return (
        <>
            <div className="main-servico">
            <Menu activeMenuItem={activeMenuItem} />
                <div className="container-servico">
                    <div className="principal-servico">
                        <IconBreadcrumbs
                            paths={[
                                { label: 'Serviço', href: '/servico' }
                            ]}
                        />
                        {/* <HeaderInterna texto="Novo Serviço" /> */}
                        <TelaServicos titulo="Serviços" placeholder="Pesquisar serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO DE EXECUÇÃO" titulo4="AÇÕES" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Servico;