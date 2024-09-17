import React from "react";
import SectionIcons from "../../components/section-icons/SectionIcons";
import Formulario from "../../components/formulario/Formulario";
import './Cadastro.css'
import Header from "../../components/header/Header"

function Cadastro() {
    return <>
    <div className="telaCadastro">
        <Header />
        <SectionIcons titulo="Já tem uma conta?" texto="Faça seu login!" botao="Login" />
        <Formulario />
    </div>
    </>
}

export default Cadastro;