import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./UserMenu.css";

function UserMenu({ onClickLogin, onClickCadastro }) {
    // Recupera as informações do usuário armazenadas no cookie
    const user = Cookies.get("user");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        if (user) {
            setUserLogged(true);
        } else {
            setUserLogged(false);
        }
    }, [user]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = (e) => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
            return;
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="user-menu-container">
            <button className="user-icon-button" onClick={toggleMenu}>
                <span className="user-icon">👤</span>
            </button>

            {isMenuOpen && (
                <div className="user-menu">
                    {false ? (
                        <div className="user-info">
                            <span>Bem Vindo!</span>
                            <div>
                                <p className="user-name">Nome</p>
                                <p className="user-email">Jonathan Aparecido Dos Reis Carvalho</p>
                            </div>
                            <div>
                                <p className="user-name">Email</p>
                                <p className="user-email">jonathan@gmail.com</p>
                            </div>
                            <br />
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeMenu(e);
                                }}
                            >
                                Meus Agendamentos
                            </button>
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
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

