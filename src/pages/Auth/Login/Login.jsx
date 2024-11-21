import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../components/formulario-login/FormularioLogin';
import './Login.css';
import SectionIcons from '../components/section-icons/SectionIcons';
import Header from '../components/header/Header';

const Login = () => {
  const [barraVisible, setBarraVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate dentro do componente

  const handleButtonClick = () => {
    navigate('/cadastro'); // Redireciona para a página de cadastro
  };
  const toggleBarraContainer = () => {
    setBarraVisible(prev => !prev);
  };
  
  return (
    
    <div className="login-container">
      <Header barraVisible={barraVisible}/>
      <SectionIcons 
        titulo="Ainda Não Tem Conta?" 
        texto="Faça Seu Cadastro!" 
        botao="Cadastre-se" 
        onClick={handleButtonClick}
        />
      <FormularioLogin toggleBarraContainer = {toggleBarraContainer}/>
    </div>
  );
};

export default Login;
