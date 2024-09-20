import React, { useState } from 'react';
import { loginUser } from '../../router/authRoutes'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Button from '../button/Button';
import iconGoogle from '../../assets/logoGoogle.png'
import './FormularioLogin.css' // Ajuste o caminho conforme necessário

const FormularioLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email e senha são obrigatórios');
    } else {
      setErrorMessage('');
      try {
        // Cria o objeto user
        const userData = {
          emailPessoa: email,
          senha: password,
        };

        // Envia o objeto user para o backend
        const response = await loginUser(userData);
        setUser(response.user);
      } catch (error) {
        setErrorMessage('Erro ao fazer login com e-mail e senha.');
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

      // Envia o objeto com uid e email para o backend
      const response = await loginUser(userData);
      setUser(response.user);
    } catch (error) {
      setErrorMessage('Erro ao fazer login com o Google.');
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
            backgroundColor="#0072FF"
            hoverColor="#006aec"
            content="Entrar"
            type="submit"
          // onClick={} // ATRIBUIR FUNÇAO
          />
          <span>OU</span>
          <Button
            size="60%"
            backgroundColor="#f3f9ff"
            color='black'
            hoverColor="#e8f3fe"
            content="Google"
            type="submit"
            onClick={handleGoogleSignIn}
            image={iconGoogle}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
