import React from "react";
import './HeaderInterna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 

function HeaderInterna({ texto}) {
    return (
        <div className="main-header-interna">
            <div className="container-header-interna">
                <div className="botao">
                    <button >
                        <FontAwesomeIcon icon={faPlus} /> {texto}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeaderInterna;