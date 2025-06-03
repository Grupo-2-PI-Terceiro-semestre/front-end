import './Breve.css';


function Breve() {
    return (
        <div className="main-breve">
            <div className="container-breve">
                <div className="texto">
                    <h3><b>Nosso App já está disponível na Play Store!</b></h3>
                    <p>Tenha tudo o que você precisa na palma da sua mão. Baixe agora e aproveite todas as funcionalidades exclusivas que preparamos pra você!</p>


                    {/* <div className="apple">
                        <FontAwesomeIcon icon={faApple} className="icon-apple" />
                        <div className="textosApple">
                            <label className="titulo" htmlFor="text">Download on the</label>
                            <label htmlFor="text"><b>App Store</b></label>
                        </div>
                    </div> */}

                    <div className="google">
                        <div className="imagem">
                            <img src="../../assets/playStore.png" alt="" />
                        </div>
                        <div className="textosGoogle">
                            <label className="titulo" htmlFor="text">Download</label>
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