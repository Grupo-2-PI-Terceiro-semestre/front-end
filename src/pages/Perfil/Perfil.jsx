import React from "react";
import "./Perfil.css";
import Menu from "../../components/menu/Menu";
import BotoesPerfil from "../../components/botoesPerfil/BotoesPerfil";
import FormularioPrincipal from "../../components/formularioDadosPrincipais/FormularioPrincipal";


function Perfil() {
    return (
        <div className="main-servico">
            <Menu />  
                <div className="principal">
                   <BotoesPerfil />
                   <FormularioPrincipal />
                </div>
        </div>
    );
}

export default Perfil;