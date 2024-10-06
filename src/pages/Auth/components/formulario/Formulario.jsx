import React, { useState } from 'react';
import './Formulario.css';
import iconGoogle from '../../../../assets/logoGoogle.png'
import Button from '../../../../components/button/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { cadastroUser } from '../../authRouter'
import { auth } from '../../../../services/firebase';


function Formulario() {
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
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                nomePessoa: user.displayName,
                emailPessoa: user.email,
                firebaseUid: user.uid,
                tiposDeUsuario: 'ADMIN',
                representante: "true",
            };
            setUser(userData);
            await cadastroUser(userData);
        } catch (error) {
            setErrorMessage('Erro ao fazer  com o Google.');
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
                    emailPessoa: '',
                    representante: "true",
                    senha: '',
                    confirmar: '',
                    tiposDeUsuario: 'ADMIN'
                });
            } catch (error) {
                setErrorMessage('Erro ao cadastrar o usuário.');
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
                            defaultValue={formData.senha}
                            onChange={handleChange}
                            required
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
                            required
                        />
                    </div>
                </div>
                ======= */}

                <div className='botoes'>
                    <Button
                        size="60%"
                        backgroundColor="#0072FF"
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