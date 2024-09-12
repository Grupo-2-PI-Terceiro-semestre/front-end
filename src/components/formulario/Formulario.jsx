import React, { useState } from 'react';
import './Formulario.css';
import iconGoogle from '../../assets/logoGoogle.png'
import Button from '../button/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';

function Formulario() {
    const [user, setUser] = useState(null);
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

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            console.log(user);
        } catch (error) {
            setErrorMessage('Erro ao fazer login com o Google.');
        }
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

                <div className='botoes'>
                    <Button
                        size="50%"
                        backgroundColor="#0072FF"
                        hoverColor="#006aec"
                        color="white"
                        content="Entrar"
                        type="submit"
                    />
                    <span>OU</span>
                    <Button
                        size="50%"
                        backgroundColor="#f3f9ff"
                        color="black"
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
}

export default Formulario;