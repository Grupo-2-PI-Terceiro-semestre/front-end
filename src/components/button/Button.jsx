import React from 'react';
import './Button.scss';

const Button = ({
  fontSize = '1rem',
  height = '2rem',
  widthImage = '',
  heightImage = '',
  size = '100%',
  padding = '10px',
  backgroundColor = '',
  fontWeight = '',
  color = 'white',
  content = 'Button',
  type = 'button',
  disabled = false,
  onClick,
  image = ''
}) => {
  return (
    <button
      disabled={disabled}
      className="dynamic-button"
      type={type}
      style={{
        fontSize: fontSize,
        height: height,
        width: size,
        padding: padding,
        color: color,
        backgroundColor: backgroundColor,
        fontWeight: fontWeight
      }}
      onClick={onClick}
    >
      {image && <img style={{ width: widthImage, height: heightImage }} src={image} alt="button-icon" className="button-image" />}
      {content}
    </button>
  );
};

export default Button;
