import React from 'react';
import './HeaderAgendamento.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';
import UserMenu from '../modal-user/UserMenu';

function HeaderAgendamento({ width, background }) {


    const handleLogout = () => {
        console.log("Logout");
    }

    return (
        <header className="headerAgendamento" style={{ backgroundColor: background }}>
            <div className="icones">
                <a href="https://www.instagram.com/">
                    <FontAwesomeIcon icon={faInstagram} className="icon" />
                </a>
                <a href="https://www.facebook.com/?locale=pt_BR">
                    <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a href="https://www.youtube.com/">
                    <FontAwesomeIcon icon={faYoutube} className="icon" />
                </a>
            </div>

            <div className="titulos" style={{ width: width }}>
                <span>Order Hub</span>
            </div>

            <div className="botaoCliente">
                <a href="/">
                    Voltar <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon" />
                </a>
                <UserMenu
                    userName="João da Silva"
                    userEmail="joao@email.com"
                    onLogout={handleLogout}
                />
            </div>

        </header>
    );
}

export default HeaderAgendamento;
