import React from "react";
import SectionIcons from "../../components/section-icons/SectionIcons";
import Formulario from "../../components/formulario/Formulario";
import './Cadastro.css'
import Header from "../../components/header/Header"
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    
    const navigate = useNavigate(); // Use useNavigate dentro do componente

    const handleButtonClick = () => {
        navigate('/login'); // Redireciona para a página de cadastro
    };
    return <>
        <Header />
        <div className="telaCadastro">
            <SectionIcons titulo="Já tem uma conta?" texto="Faça seu login!" botao="Login" onClick={handleButtonClick} />
            <Formulario />
        </div>
    </>
}

export default Cadastro;