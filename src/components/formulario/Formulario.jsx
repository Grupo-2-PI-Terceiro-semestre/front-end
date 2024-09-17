import React, { useState } from 'react';
import './Formulario.css';
import iconGoogle from '../../assets/logoGoogle.png'
import Button from '../button/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { cadastroUser } from '../../router/authRoutes'
import { auth } from '../../services/firebase';

function Formulario() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        nomePessoa: '',
        cpf: '',
        numeroTelefone: '',
        emailPessoa: '',
        representante: "true",
        senha: '',
        confirmar: '',
        dataNascimento: '',
        tiposDeUsuario: 'ADMIN'
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
            const userData = {
                emailPessoa: user.email,
                firebaseUid: user.uid,
            };
            setUser(user);
            console.log(user);
            await cadastroUser(userData);
        } catch (error) {
            setErrorMessage('Erro ao fazer login com o Google.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmar) {
            setErrorMessage('As senhas não coincidem');
        } else {
            try {
                await cadastroUser(formData);
                alert('Cadastro realizado com sucesso!');
                setFormData({
                    nomePessoa: '',
                    cpf: '',
                    numeroTelefone: '',
                    emailPessoa: '',
                    representante: "true",
                    senha: '',
                    confirmar: '',
                    dataNascimento: '',
                    tiposDeUsuario: 'ADMIN'
                });
            } catch (error) {
                setErrorMessage('Erro ao cadastrar o usuário.');
            }
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
                            name="nomePessoa"
                            placeholder="Nome Completo"
                            value={formData.nomePessoa}
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
                            name="numeroTelefone"
                            placeholder="(00)91234-1234"
                            value={formData.numeroTelefone}
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
                            name="emailPessoa"
                            placeholder="Digite seu email"
                            value={formData.emailPessoa}
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