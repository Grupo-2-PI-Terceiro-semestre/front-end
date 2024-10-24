import React from "react";
import './FirstSectionEmpresa.css';

function FirstSectionEmpresa() {
    return(
        <div className="main-first-section">
            <div className="container-first-section">
                <div className="objetos">
                    <div className="texto">
                        <span className="titulo">Visibilidade e Gestão Eficiente</span>
                        <span className="subtitulo">A dupla que impulsiona o sucesso da sua empresa</span>
                    </div>

                    <button onClick={() => window.location.href = '/cadastro'}>
                            Comece a testar gratuitamente
                        </button>
                </div>
            </div>
        </div>
    )
}

export default FirstSectionEmpresa;