import React, { useState } from "react";
import './FooterEmpresa.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';

function FooterEmpresa({ showLinks = true }) { 
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para lidar com o envio do e-mail
        alert(`Email enviado: ${email}`);
    };

    return (
        <div id='contato' className="main-footer-empresa">
            <div className="container-footer-empresa">
                <div className="borda">
                    {showLinks && (
                        <div className="titulos">
                            <label htmlFor="text">Início</label>
                            <label htmlFor="text">Login</label>
                            <label htmlFor="text">Cadastrar</label>
                        </div>
                    )}

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



                    
                </div>

                <div className="info">
                    <label htmlFor="text">Se inscreva Para Mais Informações</label>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Insira seu e-mail"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">
                            Se inscrever
                        </button>
                    </form>

                    <div className="contatos">
                        <label htmlFor="text">suporte@orderhub.com.br</label>
                        <label htmlFor="text">Contate o suporte</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterEmpresa;
