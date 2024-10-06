import React from "react";
import './Servico.css';
// import HeaderInterna from "../../components/headerInterna/HeaderInterna";
import TelaServicos from "../../components/telaServicos/TelaServicos";
import Menu from "../../components/menu/Menu";
import IconBreadcrumbs from "../../components/breadcrumb/Breadcrumb";

function Servico() {
    const activeMenuItem = 'Serviços';
    return (
        <>
            <div className="main-servico">
                <div className="container-servico">
                    <div className="menu-lateral">
                        <Menu activeMenuItem={activeMenuItem} />
                    </div>
                    <div className="principal">
                        <IconBreadcrumbs
                            paths={[
                                { label: 'Serviço', href: '/servico' }
                            ]}
                        />
                        {/* <HeaderInterna texto="Novo Serviço" /> */}
                        <TelaServicos titulo="Serviço" placeholder="Pesquisar Serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO DE EXECUÇÃO" titulo4="AÇÕES" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Servico;