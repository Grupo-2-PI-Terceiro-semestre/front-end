import React, { useState } from 'react';
import './CadastroForm.css'; // Arquivo CSS para estilização

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      alert('As senhas não coincidem');
    } else {
      // Processar o cadastro
      console.log('Cadastro realizado com sucesso!', formData);
    }
  };

  return (
    <form className="cadastro-form" onSubmit={handleSubmit}>
      <div>
        <label>Nome Completo:</label>
        <input
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          placeholder="Ex: Exemplo"
          required
        />
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="Ex: 000.000.000-00"
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="Ex: (00) 91234-1234"
          required
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ex: exemplo@gmail.com"
          required
        />
      </div>
      <div>
        <label>Crie Sua Senha:</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Ex: A@12345"
          required
        />
      </div>
      <div>
        <label>Confirme Sua Senha:</label>
        <input
          type="password"
          name="confirmaSenha"
          value={formData.confirmaSenha}
          onChange={handleChange}
          placeholder="Ex: A@12345"
          required
        />
      </div>
      <button type="submit">Cadastrar</button>

      <div className="divider">
        <span>OU</span>
      </div>

      <button type="button" className="google-button">
        <img src="google-icon.png" alt="Google" /> Google
      </button>
    </form>
  );
};

export default CadastroForm;
