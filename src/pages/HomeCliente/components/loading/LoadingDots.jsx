import React from 'react';
import './LoadingDots.css';

const LoadingDots = ({ size = 15 }) => {
    return (
        <div className="loading-dots">
            <div style={{ width: size, height: size }} className="dot"></div>
            <div style={{ width: size, height: size }} className="dot"></div>
            <div style={{ width: size, height: size }} className="dot"></div>
            <div style={{ width: size, height: size }} className="dot"></div>
        </div>
    );
};

export default LoadingDots;
