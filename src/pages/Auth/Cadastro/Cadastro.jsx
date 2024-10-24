import React, { useState } from 'react';
import SectionIcons from "../components/section-icons/SectionIcons";
import Formulario from "../components/formulario/Formulario";
import './Cadastro.css'
import Header from "../components/header/Header"
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [barraVisible, setBarraVisible] = useState(false);
    const navigate = useNavigate(); // Use useNavigate dentro do componente

    const handleButtonClick = () => {
        navigate('/login');
    };
    const toggleBarraContainer = () => {
        setBarraVisible(prev => !prev);
    };

    return <>
        <Header barraVisible={barraVisible}/>
        <div className="telaCadastro">
            <SectionIcons titulo="Já tem uma conta?" texto="Faça seu login!" botao="Login" onClick={handleButtonClick} />
            <Formulario toggleBarraContainer={toggleBarraContainer} />
        </div>
    </>
}

export default Cadastro;