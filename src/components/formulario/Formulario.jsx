import React, { useState } from 'react';
import './Formulario.css';
import iconGoogle from '../../assets/logoGoogle.png'

function Formulario() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        senha: '',
        confirmar: ''
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
            console.log('Cadastro realizado com sucesso!', formData);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className='inputLabel'>
                        <label>Nome Completo:</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome Completo"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>CPF:</label>
                        <input
                            type="text"
                            name="cpf"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>Telefone:</label>
                        <input
                            type="text"
                            name="telefone"
                            placeholder="(00)91234-1234"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>Crie Sua Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="A@12345"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>Confirme Sua Senha:</label>
                        <input
                            name="confirmar"
                            placeholder="A@12345"
                            value={formData.confirmar}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='botao'>
                    <button type="submit" className="submit-button">
                        Cadastrar
                    </button>
                </div>

                <div className='divisoria'>
                    <div className='linha-esquerda'></div>
                    <label>OU</label>
                    <div className='linha-direita'></div>
                </div>

                <div className='botao-google'>
                    <button type="submit" className="submit-button">
                        <img src={iconGoogle} alt="iconeGoogle" />
                        Google
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Formulario;