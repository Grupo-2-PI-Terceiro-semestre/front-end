import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./UserMenu.css";

function UserMenu({ onClickLogin, onClickCadastro, onClickAgenda }) {

    const user = Cookies.get('cliente') ? JSON.parse(Cookies.get('cliente')) : null;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = (e) => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
            return;
        }
        setIsMenuOpen(false);
    };

    const logultClick = () => {
        Cookies.remove('cliente');
        window.location.reload();
    }

    return (
        <div className="user-menu-container">
            <button className="user-icon-button" onClick={toggleMenu}>
                <span className="user-icon">👤</span>
            </button>

            {isMenuOpen && (
                <div className="user-menu">
                    {user ? (
                        <div className="user-info">
                            <span>Bem Vindo!</span>
                            <div>
                                <p className="user-name">Nome</p>
                                <p className="user-email">{user.nomePessoa}</p>
                            </div>
                            <div>
                                <p className="user-name">Email</p>
                                <p className="user-email">{user.emailPessoa}</p>
                            </div>
                            <br />
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickAgenda();
                                    closeMenu(e);
                                }}
                            >
                                Meus Agendamentos
                            </button>
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    logultClick();
                                    closeMenu(e);
                                }}
                            >
                                Logoult
                            </button>
                        </div>
                    ) : (
                        <div className="user-actions">
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickLogin();
                                    closeMenu(e);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickCadastro();
                                    closeMenu(e);
                                }}
                            >
                                Cadastro
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserMenu;

