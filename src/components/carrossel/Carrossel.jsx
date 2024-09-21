import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carrossel.css';

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
        <div className='main' style={{ width: "80%", margin: "0 auto" }}>
        <h2>Carrossel Simples</h2>
        <Slider {...settings}>
          <div>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Slide 1"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Slide 2"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Slide 3"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Slide 4"
              style={{ width: "100%" }}
            />
          </div>
        </Slider>
      </div>
    );
}

export default Carrossel;