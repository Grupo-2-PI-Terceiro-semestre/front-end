import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carrossel.css';
import FirstSectionEmpresa from "../../components/firstSectionEmpresa/FirstSectionEmpresa";

function Carrossel() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
      };

    return(
        <div className='main-carrossel'>
        {/* <h2>Carrossel Simples</h2> */}
        <Slider {...settings}>
          <div className='bordaImagem'>
            <div className='imagem1'>
              <img
                src='../../assets/section1.png'
                // alt="Slide 1"
              />
            </div>
          </div>
          <div className='bordaImagem'>
            <div className='imagem2'>
              <img
                src='../../assets/section1.png'
              />
            </div>
          </div>
          <div className='bordaImagem'>
            <div className='imagem3'>
              <img
                src='../../assets/section1.png'
              />
            </div>
          </div>
          <div className='bordaImagem'>
            <div className='imagem4'>
              <img
                src='../../assets/section1.png'
              />
            </div>
          </div>
        </Slider>

        <FirstSectionEmpresa />

        {/* <div className="container">
                <div className="objetos">
                    <div className="texto">
                        <span className="titulo">Visibilidade e Gestão Eficiente</span>
                        <span className="subtitulo">A dupla que impulsiona o sucesso da sua empresa</span>
                    </div>

                    <button>Comece a testar gratuitamente</button>
                </div>
          </div> */}
      </div>
    );
}

export default Carrossel;