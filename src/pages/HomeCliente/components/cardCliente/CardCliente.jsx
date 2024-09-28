import React, { useState } from 'react';
import './CardCliente.css'; 

const CardCliente = () => {
  const cards = [
    {
      id: 1,
      title: 'Salão Bem Viver',
      location: 'Casa Verde - SP',
      description: 'Serviços: Corte de cabelo, coloração de cabelo, tratamentos capilares, etc...',
      rating: 5,
      img: 'https://cosmeticinnovation.com.br/wp-content/uploads/2020/05/avec.jpg'
    },
    {
      id: 2,
      title: 'Salão Bem Viver',
      location: 'Casa Verde - SP',
      description: 'Serviços: Corte de cabelo, coloração de cabelo, tratamentos capilares, etc...',
      rating: 5,
      img: 'https://blog.carreirabeauty.com/wp-content/uploads/2014/01/7-dicas-salao-beleza-vender-servicos-internet.jpg'
    },
    {
      id: 3,
      title: 'Salão Bem Viver',
      location: 'Casa Verde - SP',
      description: 'Serviços: Corte de cabelo, coloração de cabelo, tratamentos capilares, etc...',
      rating: 5,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb6tTdLhPwaGMwMqz7HmJz3L8DBvpqjbMP33JDWa6XFc4rCyXrByMg8HjWrYUKA4z9aUg&usqp=CAU'
    },
    {
      id: 4,
      title: 'Salão Bem Viver',
      location: 'Casa Verde - SP',
      description: 'Serviços: Corte de cabelo, coloração de cabelo, tratamentos capilares, etc...',
      rating: 5,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRfk6J-6mK7XT25B9RStxNiSgiWrpoC4P4-VQeFbTAKYAHlJ9h5_ckma4wp_-uZoZAqeQ&usqp=CAU'
    },
    {
      id: 5,
      title: 'Salão Bem Viver',
      location: 'Casa Verde - SP',
      description: 'Serviços: Corte de cabelo, coloração de cabelo, tratamentos capilares, etc...',
      rating: 5,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0zAVoPEkiGKVwEpB9-82-3it4YHz_oi4MZ6niLVXT9NvAHMc_2bV9IZuVP8YjtUu6Mg&usqp=CAU'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3; 

  const handlePrev = () => {
    const isFirstCard = currentIndex === 0;
    const newIndex = isFirstCard ? cards.length - visibleCards : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastCard = currentIndex >= cards.length - visibleCards;
    const newIndex = isLastCard ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="main-carrosel">
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>‹</button>

      <div className="cards-wrapper">
        {cards.slice(currentIndex, currentIndex + visibleCards).map((card) => (
          <div key={card.id} className="card">
            <img src={card.img} alt={card.title} className="card-img" />
            <div className="card-content">
                <p>{card.location}</p>
                    <h3>{card.title}</h3>
                <p>{card.description}</p>
            <div className="rating">
                 {'★'.repeat(card.rating)}
                </div>
</div>
          </div>
        ))}
      </div>

      <button className="carousel-button next" onClick={handleNext}>›</button>
    </div>
    </div>
  );
};

export default CardCliente;
