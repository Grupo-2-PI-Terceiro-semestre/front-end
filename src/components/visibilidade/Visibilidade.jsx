import React from "react";
import './Visibilidade.css';

function Visibilidade() {
    return(
        <div className="main-visibilidade">
            <div className="container-visibilidade">
                <div className="textos">
                    <div className="titulo">
                        <h1>Amplie Sua <b>Visibilidade</b></h1>
                        <label htmlFor="text">Aproveite nossa plataforma para alcançar mais clientes.</label>
                    </div>

                    <div className="paragrafo">
                        <label htmlFor="text">Com nossa solução, sua empresa ganha destaque e visibilidade como nunca antes. Nossa plataforma foi projetada para colocar sua marca no centro das atenções, ampliando sua presença no mercado e atraindo mais clientes.</label>
                    </div>

                    <div className="botao">
                        <button>Comece a testar gratuitamente</button>                        
                    </div>
                </div>

                <div className="imagem">
                    <img src='../../assets/meninoSeta.png' />
                </div>

            </div>
        </div>
    )
}

export default Visibilidade;