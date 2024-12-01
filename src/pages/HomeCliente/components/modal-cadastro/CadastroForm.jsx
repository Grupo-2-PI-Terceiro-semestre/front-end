import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CadastroForm.css";
import Button from "../../../../components/button/Button";
import { auth } from '../../../../services/firebase';
import iconGoogle from '../../../../assets/logoGoogle.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { cadastrarCliente } from '../../../../services/homeClienteServices'
import LoadingDots from '../loading/LoadingDots'
import { successToast, errorToast } from '../../../../utils/Toats'

function CadastroForm({ onClose }) {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState(null);
    const [messageError, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const onSubmit = async (data) => {
        if (!data) {
            setErrorMessage('Email e senha são obrigatórios');
        } else {
            setLoading(true);
            try {
                const userData = {
                    nomePessoa: data.nome,
                    emailPessoa: data.email,
                    numeroTelefone: data.telefone,
                    senha: data.password,
                };
                const response = await cadastrarCliente(userData);
                setUser(response.user);
                successToast('Cadastro realizado com sucesso');
                onClose();
            } catch (error) {
                errorToast('Erro ao cadastrar usuário');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                nome: user.displayName,
                emailPessoa: user.email,
                firebaseUid: user.uid,
            };
            const response = await cadastrarCliente(userData);
            setUser(response.user);
        } catch (error) {

            setErrorMessage("Email ou senha invalidos");
        }
    };

    return (
        <div className="modal-overlay-login" onClick={handleOverlayClick}>
            <div className="modal-content-login">
                <button className="close-button-login" onClick={onClose}>
                    ×
                </button>
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group-login">
                        <label>Nome:</label>
                        <input
                            type="text"
                            {...register("nome", { required: true })}
                        />
                    </div>
                    <div className="form-group-login">
                        <label>Email:</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="form-group-login">
                        <label>Telefone:</label>
                        <input
                            type="telefone"
                            {...register("telefone", { required: false })}
                        />
                    </div>
                    <div className="form-group-login">
                        <label>Senha:</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <label>Confirmar Senha:</label>
                        <input
                            type="password"
                            {...register("passwordConfirm", { required: true })}
                        />
                    </div>
                    <div className="button-form-login">
                        <Button
                            size="100%"
                            content="Cadastrar"
                            type="submit"
                            onClick={handleSubmit}
                        />
                        <Button
                            size="100%"
                            color="black"
                            backgroundColor="#f3f9ff"
                            content="Google"
                            onClick={handleGoogleSignIn}
                            image={iconGoogle}
                        />
                    </div>
                    <a>{messageError}</a>
                </form>
                {loading &&
                    <div className="container-load">
                        <LoadingDots size={20} />
                    </div>
                }
            </div>
        </div>
    );

}

export default CadastroForm;
