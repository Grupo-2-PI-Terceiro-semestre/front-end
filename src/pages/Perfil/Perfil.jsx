import React from "react";
import "./Perfil.css";
import MenuPerfil from "../../components/menuPerfil/MenuPerfil";
import BotoesPerfil from "../../components/botoesPerfil/BotoesPerfil";
import FormularioPrincipal from "../../components/formularioDadosPrincipais/FormularioPrincipal";


function Perfil() {
    return (
        <div className="main-servico">
            <div className="container-perfil">
                <div className="menu-lateral">
                    <MenuPerfil />
                </div>                
                <div className="principal">
                   <BotoesPerfil />
                   <FormularioPrincipal />
                </div>
               
            </div>
        </div>
    );
}

export default Perfil;