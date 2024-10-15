import React from "react";
import "./Perfil.css";
import Menu from "../../components/menu/Menu";
import BotoesPerfil from "./components/botoesPerfil/BotoesPerfil";
import FormularioPrincipal from "./components/formularioDadosPrincipais/FormularioPrincipal";
import IconBreadcrumbs from "../../components/breadcrumb/Breadcrumb";
import FormularioFuncionamento from "./formularioFuncionamento/FormularioFuncionamento";
/* import CardLocation from "./components/CardLocation/CardLocation";
 */

function Perfil() {
    return (

        <div className="main-perfil">
            <Menu />

            <div className="principal">
                <IconBreadcrumbs
                    paths={[
                        { label: 'Perfil', href: '/perfil' }
                    ]}
                />
                <div className="conteudo-perfil">
                    <BotoesPerfil />
                    <FormularioFuncionamento />
                </div>
            </div>
        </div>
    );
}

export default Perfil;