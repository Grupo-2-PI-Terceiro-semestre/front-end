import React, { useEffect, useState } from 'react';
import './HeaderEmpresa.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';

function HeaderEmpresa({ navLinks, buttonText, width, widthOpcoes }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { 
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`headerEmpresa ${isScrolled ? 'headerScroll' : ''}`}>
            <div className='icones'>
                <FontAwesomeIcon icon={faInstagram} className="icon" />
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
                <FontAwesomeIcon icon={faYoutube} className="icon" />
            </div>

            <div className='titulos' style={{ width: width }}>
                <span>Order Hub</span>
                <div className='opcoes' style={{ width: widthOpcoes }}>
                    <nav className='nav'>
                        {navLinks.map((link, index) => (
                            <a href={link.url} key={index}>{link.name}</a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className='botaoCliente'>
                <a href="">{buttonText} <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon" /></a>
            </div>
        </header>
    );
}

export default HeaderEmpresa;
