import React, { useState } from "react";
import "./Perfil.css";
import Menu from "../../components/menu/Menu";
import BotoesPerfil from "./components/botoesPerfil/BotoesPerfil";
import FormularioPrincipal from "./components/formularioDadosPrincipais/FormularioPrincipal";
import FormularioFuncionamento from "./components/formularioFuncionamento/FormularioFuncionamento";
import FormularioLocalizacao from "./components/formularioLocalizacao/FormularioLocalizacao";
import FormularioNotificacao from "./components/formularioNotificacao/FormularioNotificacao";

function Perfil() {
  const [activeButton, setActiveButton] = useState('dados');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="main-perfil">
      <Menu activeMenuItem="Perfil" refreshKey={refreshKey} />
      <div className="principal">
        <div className="conteudo-perfil">
          <BotoesPerfil activeButton={activeButton} setActiveButton={setActiveButton} />
          
          {activeButton === 'dados' && <FormularioPrincipal setRefreshKey={setRefreshKey} />}
          {activeButton === 'localizacao' && <FormularioLocalizacao />}
          {activeButton === 'galeria' && <FormularioFuncionamento />}
          {activeButton === 'notificacoes' && <FormularioNotificacao />}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
