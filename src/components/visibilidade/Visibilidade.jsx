import React, {useEffect, useRef} from "react";
import './Visibilidade.css';

function Visibilidade() {
    // const useRef = {};
    const imageRef = useRef('/src/assets/meninoSeta.png');


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1 // O elemento é considerado visível quando 10% dele aparece
        });

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        // Cleanup do observer quando o componente desmontar
        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);


    return (
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

                <div className="imagem" ref={imageRef}>
                    <img src='../../assets/meninoSeta.png' alt="menino com seta" />
                </div>

            </div>
        </div>
    )
}

export default Visibilidade;