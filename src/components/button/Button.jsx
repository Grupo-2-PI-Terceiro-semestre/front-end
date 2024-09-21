import React from 'react';
import './Button.css';

const Button = ({
  size = '100%',
  padding = '10px',
  backgroundColor = '#0072FF',
  color = 'white',
  hoverColor = '#0056b3', // Valor padrão para hoverColor
  content = 'Button',
  type = 'button',
  onClick,
  image = '',
}) => {
  return (
    <button
      className="dynamic-button"
      type={type}
      style={{
        width: size,
        padding: padding,
        backgroundColor: backgroundColor,
        color: color,
        '--hoverColor': hoverColor, 
      }}
      onClick={onClick}
    >
      {image && <img src={image} alt="button-icon" className="button-image" />}
      {content}
    </button>
  );
};

export default Button;
