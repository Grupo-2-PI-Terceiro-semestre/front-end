import React, { useState } from 'react';
import './Formulario.css';
import iconGoogle from '../../../../assets/logoGoogle.png'
import Button from '../../../../components/button/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { cadastroUser } from '../../authRouter'
import { auth } from '../../../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { successToast, infoToast, errorToast } from '../../../../utils/Toats'



function Formulario({ toggleBarraContainer }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        nomePessoa: '',
        emailPessoa: '',
        representante: "true",
        senha: '',
        confirmar: '',
        tiposDeUsuario: 'ADMIN'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            toggleBarraContainer();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                nomePessoa: user.displayName,
                emailPessoa: user.email,
                firebaseUid: user.uid,
                tiposDeUsuario: 'ADMIN',
                representante: 'true',
            };

            setUser(userData);
            await cadastroUser(userData);
            toggleBarraContainer();
            successCadastro();
        } catch (error) {
            toggleBarraContainer();
            console.error('Erro:', error);

            if (error.status === 409) {
                infoToast('Usuário já cadastrado');
                navigate('/login')
            } else {
                errorToast('Erro ao cadastrar o usuário, tente novamente mais tarde');
            }
        }
    };

    const successCadastro = () => {
        successToast('Usuário cadastrado com sucesso');
        navigate('/login')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmar) {
            setErrorMessage('As senhas não coincidem');
        } else if (formData.emailPessoa.indexOf('@') == -1 || formData.emailPessoa.indexOf('.') == -1) {
            setErrorMessage('Insira um E-mail válido');
        } else if (formData.senha.length < 6) {
            setErrorMessage('Sua senha precisa conter mais de 6 caracteres');
        } {
            try {
                toggleBarraContainer();
                await cadastroUser(formData);
                setFormData({
                    nomePessoa: '',
                    emailPessoa: '',
                    representante: "true",
                    senha: '',
                    confirmar: '',
                    tiposDeUsuario: 'ADMIN'
                });
                toggleBarraContainer();
                successCadastro();
            } catch (error) {
                toggleBarraContainer();
                setTimeout(() => {
                    setErrorMessage('Erro ao cadastrar o usuário.');
                }, 3000);
            }
        }
    };

    return (

        <div className="form-container">
            <h2>Cadastro</h2>
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
                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="emailPessoa"
                            required={true}
                            placeholder="Digite seu email"
                            value={formData.emailPessoa}
                            onChange={handleChange}
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
                            defaultValue={formData.senha}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className='inputLabel'>
                        <label>Confirme Sua Senha:</label>
                        <input
                            type="password"
                            name="confirmar"
                            placeholder="A@12345"
                            defaultValue={formData.confirmar}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                </div>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <div className='botoes'>
                    <Button
                        size="60%"
                        color="white"
                        content="Cadastrar"
                        onClick={handleSubmit}
                        type="submit"
                    />
                    <span>OU</span>
                    <Button
                        size="60%"
                        backgroundColor="#f3f9ff"
                        color="black"
                        content="Google"
                        onClick={handleGoogleSignIn}
                        image={iconGoogle}
                    />
                </div>
            </form >
        </div >
    );
}

export default Formulario;