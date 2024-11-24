// Carousel.js
import React, { useState } from 'react';
import Card from './Card';
import './CardCliente.css';
import LoadingDots from '../loading/LoadingDots'

const Carousel = ({ cards, isLoading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3;

    const handlePrev = () => {
        const isFirstCard = currentIndex === 0;
        const newIndex = isFirstCard ? cards.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const isLastCard = currentIndex === cards.length - 1;
        const newIndex = isLastCard ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const getVisibleCards = () => {
        const visible = [];
        const totalVisibleCards = Math.min(visibleCards, cards.length);

        for (let i = 0; i < totalVisibleCards; i++) {
            const index = (currentIndex + i) % cards.length;
            visible.push(cards[index]);
        }
        return visible;
    };

    if (isLoading) {
        return (
            <div className="loading-cards">
                <LoadingDots />
            </div>
        );
    }

    return (
        <div className="main-carrosel">
            <button className="carousel-button prev" onClick={handlePrev}>‹</button>
            <div className="cards-wrapper">
                {getVisibleCards().map((card, index) => (
                    <div key={index}>
                        <Card card={card} />
                    </div>
                ))}
            </div>
            <button className="carousel-button next" onClick={handleNext}>›</button>
        </div>
    );
};


export default Carousel;
