import React from 'react';
import './Button.css';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const Button = ({
  fontSize = '1rem',
  height = '2rem',
  widthImage = '',
  heightImage = '',
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
        fontSize: fontSize,
        height: height,
        width: size,
        padding: padding,
        backgroundColor: backgroundColor,
        color: color,
        '--hoverColor': hoverColor, 
      }}
      onClick={onClick}
    >
      {image && <img style={{width: widthImage, height: heightImage}} src={image} alt="button-icon" className="button-image" />}
      {content}
    </button>
  );
};

export default Button;
