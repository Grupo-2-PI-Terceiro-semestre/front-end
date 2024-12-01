import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { RiAccountCircleLine } from "react-icons/ri";
import "./UserMenu.css";

function UserMenu({ onClickLogin, onClickCadastro, onClickAgenda }) {
    const user = Cookies.get('cliente') ? JSON.parse(Cookies.get('cliente')) : null;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // Referência para o menu

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const logultClick = () => {
        Cookies.remove('cliente');
        window.location.reload();
    };

    // Fecha o menu se clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-menu-container" ref={menuRef}>
            <button className="user-icon-button" onClick={toggleMenu}>
                <span className="user-icon"><RiAccountCircleLine /></span>
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
                                    setIsMenuOpen(false);
                                }}
                            >
                                Meus Agendamentos
                            </button>
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    logultClick();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="user-actions">
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickLogin();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="menu-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickCadastro();
                                    setIsMenuOpen(false);
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
