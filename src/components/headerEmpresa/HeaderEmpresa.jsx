import React from 'react';
import './HeaderEmpresa.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function HeaderEmpresa() {
    return(
        <header className='headerEmpresa'>
            <div className='icones'>
                <FontAwesomeIcon icon={faInstagram} className="icon"/>
                <FontAwesomeIcon icon={faFacebookF} className="icon"/>
                <FontAwesomeIcon icon={faYoutube} className="icon"/>
            </div>

            <div className='titulos'>
                <span>Order Hub</span>
                <div className='opcoes'>
                    <nav className='nav'>
                        <a href="">Inicio</a>
                        <a href="">Sobre</a>
                        <a href="">Preview</a>
                        {/* <a href="">Planos</a> */}
                        <a href="">Contato</a>
                        <a href="">Cadastro</a>
                        <a href="">Login</a>
                    </nav>
                </div>
            </div>

            <div className='botaoCliente'>
                <a href="">Para Clientes <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon" /></a>
            </div>
        </header>
    )
}

export default HeaderEmpresa;