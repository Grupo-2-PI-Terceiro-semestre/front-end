import React, { useState } from 'react';
import './FormularioLogin.css';
import Button from '../button/Button';
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../services/firebase' // Importando o arquivo CSS

const FormularioLogin = () => {
  const [user, setUser] = useState < FirebaseUser | null > (null); // Tipagem correta
  const [email, Email] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {

    } else {
      setErrorMessage('');
      console.log('Email:', email);
      console.log('Senha:', password);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('Usuário logado:', user);
    } catch (error) {
      console.error('Erro ao logar com Google:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
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
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
