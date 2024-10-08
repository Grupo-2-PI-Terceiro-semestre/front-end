import React, { useEffect, useRef } from "react";
import './Visibilidade.css';
import meninoSeta from '../../../../assets/meninoSeta.png';  // Certifique-se que o caminho está correto

function Visibilidade() {
    const imageRef = useRef(null);  // Referência ao DOM da imagem

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, {
            threshold: 0.1  // O elemento será visível quando 10% estiver à vista
        });

        if (imageRef.current) {
            observer.observe(imageRef.current);  // Observar a div da imagem
        }

        // Cleanup do observer
        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    return (
        <div id="contato" className="main-visibilidade">
            <div className="container-visibilidade">
                <div className="textos">
                    <div className="titulo">
                        <h1>Amplie Sua <b>Visibilidade</b></h1>
                        <label>Aproveite nossa plataforma para alcançar mais clientes.</label>
                    </div>

                    <div className="paragrafo">
                        <label>Com nossa solução, sua empresa ganha destaque e visibilidade como nunca antes. Nossa plataforma foi projetada para colocar sua marca no centro das atenções, ampliando sua presença no mercado e atraindo mais clientes.</label>
                    </div>

                    <div className="botao">
                        <button>Comece a testar gratuitamente</button>
                    </div>
                </div>

                <div className="imagem" ref={imageRef}>
                    <img src={meninoSeta} alt="menino com seta" />
                </div>

            </div>
        </div>
    );
}

export default Visibilidade;
