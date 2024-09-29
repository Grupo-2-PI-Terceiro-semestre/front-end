import React from "react";
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import Carrossel from "./components/carrossel/Carrossel"
import AboutUs from "./components/aboutUs/AboutUs";
import './HomeEmpresa.css';
import Previa from "./components/previa/Previa";
import Visibilidade from "./components/visibilidade/Visibilidade";
import Breve from "../../components/breve/Breve";
import PerguntasFrequentes from "./components/perguntasFrequentes/PerguntasFrequentes";
import FooterEmpresa from "../../components/footerEmpresa/FooterEmpresa";

function HomeEmpresa() {
  return (
    <div className="main-home">
      <HeaderEmpresa width="60vw"
        navLinks={[
          { name: 'Início', url: '/inicio' },
          { name: 'Sobre', url: '/sobre' },
          { name: 'Preview', url: '/preview' },
          { name: 'Contato', url: '/contato' },
          { name: 'Cadastro', url: '/cadastro' },
          { name: 'Login', url: '/login' }
        ]}

        buttonText="Para Clientes"


      />

      {/* <FirstSectionEmpresa /> */}
      <Carrossel />
      <AboutUs />
      <Previa />
      <Visibilidade />
      <PerguntasFrequentes />
      <Breve />
      <FooterEmpresa />
    </div>
  );
}

export default HomeEmpresa;