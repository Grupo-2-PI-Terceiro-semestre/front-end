import React, { useState } from 'react';
import { loginUser } from '../../authRouter.js'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../services/firebase';
import Button from '../../../../components/button/Button';
import iconGoogle from '../../../../assets/logoGoogle.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './FormularioLogin.css'

const FormularioLogin = ({ toggleBarraContainer }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email e senha são obrigatórios');
      return;
    }

    clearSession();

    toggleBarraContainer();
    setErrorMessage('');
    try {
      const userData = {
        emailPessoa: email,
        senha: password,
      };
      const response = await loginUser(userData);

      setUser(response.user);
      toggleBarraContainer();
      navigate('/agenda');
    } catch (error) {
      toggleBarraContainer();
      setErrorMessage('Email ou senha inválidos');
    } finally {
      toggleBarraContainer();
    }
  };

  const clearSession = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    localStorage.clear();
  };

  const handleGoogleSignIn = async () => {

    clearSession();

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toggleBarraContainer();
      const user = result.user;
      const userData = {
        emailPessoa: user.email,
        firebaseUid: user.uid,
      };
      const response = await loginUser(userData);
      setUser(response.user);
      toggleBarraContainer();
      navigate('/agenda');
    } catch (error) {
      toggleBarraContainer();
      setErrorMessage("Email ou senha invalidos");
    } finally {
      toggleBarraContainer();
    }
  };


  return (
    <div className="login-form">
      <form className="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className='botoes'>
          <Button
            size="60%"
            content="Entrar"
            type="submit"
            onClick={handleSubmit}
          />
          <span>OU</span>
          <Button
            size="60%"
            color='black'
            backgroundColor='#f3f9ff'
            content="Google"
            onClick={handleGoogleSignIn}
            image={iconGoogle}
          //quando apertar o botão display do barra-container como block (ele está none)
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
