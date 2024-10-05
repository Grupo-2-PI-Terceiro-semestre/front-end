import React, { useState } from 'react';
import { loginUser } from '../../authRouter.js'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../services/firebase';
import Button from '../../../../components/button/Button';
import iconGoogle from '../../../../assets/logoGoogle.png'
import { useNavigate } from 'react-router-dom';
import './FormularioLogin.css'
import LinearProgress from '../../../../components/barra-load/LinearProgress';

const FormularioLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email e senha são obrigatórios');
    } else {
      setErrorMessage('');
      try {
        const userData = {
          emailPessoa: email,
          senha: password,
        };
        const response = await loginUser(userData);
        setUser(response.user);
        navigate('/agenda')
      } catch (error) {
        setErrorMessage('Email ou senha invalidos');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        emailPessoa: user.email,
        firebaseUid: user.uid,
      };
      const response = await loginUser(userData);
      setUser(response.user);
      navigate('/agenda');
    } catch (error) {
      setErrorMessage("Email ou senha invalidos");
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
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
