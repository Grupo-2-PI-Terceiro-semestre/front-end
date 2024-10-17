import React from "react";
import './PerguntasFrequentes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

function PerguntasFrequentes() {
    return(
        <div className="main-perguntas">
            <div className="container-perguntas">
                <h1>Perguntas Frequentes</h1>

                <div className="perguntas">
                    <div className="pergunta1">
                        <div className="tituloPerguntas">
                            <h1>01</h1>
                            <label htmlFor="text">Como faço para adicionar ou remover serviços?</label>
                        </div>

                        <div className="resposta">
                            <FontAwesomeIcon icon={faCheck} className="icon-check" />
                            <label htmlFor="text">Ao realizar login, dentro da página de serviços, você pode adicionar novos serviços, definir a duração e o preço.</label>
                        </div>

                        <div className="botao">
                            <button>Quero Gerenciar</button>
                        </div>
                    </div>

                    <div className="pergunta2">
                        <div className="tituloPerguntas">
                            <h1>02</h1>
                            <label htmlFor="text">É possível gerenciar a minha agenda?</label>
                        </div>

                        <div className="resposta">
                            <FontAwesomeIcon icon={faCheck} className="icon-check" />
                            <label htmlFor="text">Sim, com a nossa aplicação, você pode gerenciar sua agenda de acordo com os profissionais.</label>
                        </div>

                        <div className="botao">
                            <button>Quero Gerenciar</button>
                        </div>
                    </div>

                    <div className="pergunta3">
                        <div className="tituloPerguntas">
                            <h1>03</h1>
                            <label htmlFor="text">Como posso gerenciar todo o meu estabelecimento?</label>
                        </div>

                        <div className="resposta">
                            <FontAwesomeIcon icon={faCheck} className="icon-check" />
                            <label htmlFor="text">Pensando no seu crescimento,  nossa aplicação conta com uma dashboard, para monitorar seu negócio.</label>
                        </div>

                        <div className="botao">
                            <button>Quero Gerenciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerguntasFrequentes;