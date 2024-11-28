import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import Button from "../../../../components/button/Button";
import { auth } from '../../../../services/firebase';
import iconGoogle from '../../../../assets/logoGoogle.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


function LoginForm({ onClose }) {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState(null);
    const [messageError, setErrorMessage] = useState('');

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const onSubmit = async (data) => {
        if (!data) {
            setErrorMessage('Email e senha são obrigatórios');
        } else {
            try {
                const userData = {
                    emailPessoa: email,
                    senha: password,
                };
                const response = await loginUser(userData);
                setUser(response.user);
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group-login">
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="form-group-login">
                        <label>Senha</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <div className="button-form-login">
                        <Button
                            size="100%"
                            content="Entrar"
                            type="submit"
                            onClick={handleSubmit}
                        />
                        <Button
                            size="100%"
                            color='black'
                            backgroundColor='#f3f9ff'
                            content="Google"
                            onClick={handleGoogleSignIn}
                            image={iconGoogle}
                        />
                    </div>
                    <a>{messageError}</a>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
