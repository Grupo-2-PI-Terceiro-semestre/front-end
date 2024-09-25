import React from "react";
import './Breve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';

function Breve() {
    return(
        <div className="main-breve">
            <div className="container-breve">
                <div className="texto">
                    <h1>Em breve, estaremos disponíveis em seu smartphone:</h1>

                    <div className="apple">
                        <FontAwesomeIcon icon={faApple} className="icon-apple" />
                        <div className="textosApple">
                            <label className="titulo" htmlFor="text">Download on the</label> 
                            <label htmlFor="text"><b>App Store</b></label>
                        </div>
                    </div>

                    <div className="google">
                        <div className="textosGoogle">
                            <label className="titulo" htmlFor="text">Download on the</label> 
                            <label htmlFor="text"><b>Play Store</b></label>
                        </div>
                    </div>
                </div>

                <div className="imagem">
                    <img src='../../assets/mobile.png' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Breve;