import React from 'react';
import './Button.css';

const Button = ({ size = '100%', padding = '10px', backgroundColor = '#0072FF', color = 'white', hoverColor, content = 'Button', type = 'button', onClick }) => {
    return (
        <button
            className="dynamic-button"
            type={type}
            style={{
                width: size,
                padding: padding,
                backgroundColor: backgroundColor,
                color: color,
            }}
            onClick={onClick}
        >
            {content}
        </button>
    );
};

export default Button;
