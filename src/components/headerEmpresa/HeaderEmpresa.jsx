import React, { useEffect, useState } from "react";
import "./HeaderEmpresa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import UserMenu from "../../pages/HomeCliente/components/modal-user/UserMenu";
import Tooltip from '@mui/material/Tooltip';
import Box from "@mui/material/Box";

function HeaderEmpresa({
    navLinks = [],
    buttonText,
    width,
    widthOpcoes,
    url,
    isHomeCliente = true,
    isButtonVisible = false,
    onLoginClick,
    onCadastroClick,
    onAgendaClick
}) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const headerStyle = {
        backgroundColor: isHomeCliente ? "" : "#00000051"
    };

    return (
        <header
            style={headerStyle}
            className={`headerEmpresa ${isScrolled ? "headerScroll" : ""}`}
        >
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

            <div className="titulos" style={{ width: width, justifyContent: isButtonVisible ? 'center' : 'space-around' }}>
                <span>
                    <a href={url}>
                        Order Hub
                    </a>
                </span>

                <div className="opcoes" style={{ width: widthOpcoes }}>
                    {!isButtonVisible && (
                        <nav className="nav">
                            {navLinks.map((link, index) => (
                                <a href={link.url} key={index}>{link.name}</a>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {isButtonVisible && (
                <UserMenu
                    onClickLogin={onLoginClick}
                    onClickCadastro={onCadastroClick}
                    onClickAgenda={onAgendaClick}
                />
            )}
            <div className="botaoCliente">
                <a href={url}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'absolute', marginBottom: '3rem', right: '3rem' }}>
                            <Tooltip title={buttonText}>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon" />
                            </Tooltip>
                        </Box>
                    </Box>
                </a>
            </div>

            
        </header>
    );
}

export default HeaderEmpresa;
