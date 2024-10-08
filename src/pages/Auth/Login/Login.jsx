import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../components/formulario-login/FormularioLogin';
import './Login.css';
import SectionIcons from '../components/section-icons/SectionIcons';
import Header from '../components/header/Header';
import LinearProgress from '../../../components/barra-load/LinearProgress';

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate dentro do componente

  const handleButtonClick = () => {
    navigate('/cadastro'); // Redireciona para a página de cadastro
  };

  return (
    
    <div className="login-container">
      
      <Header />
      <SectionIcons 
        titulo="Ainda Não Tem Conta?" 
        texto="Faça Seu Cadastro!" 
        botao="Cadastre-se" 
        onClick={handleButtonClick}
      />
      <FormularioLogin />
    </div>
  );
};

export default Login;
