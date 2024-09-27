import React from 'react';
import './menuCliente.css'; 

const categories = [
  'Salões de Beleza',
  'Barbearias',
  'Manicure & Nail Designer',
  'Esteticistas',
  'Sobrancelhas & Cílios'
  
  

];

const menuCliente = () => {
  return (
    <div className="category-bar">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default menuCliente;
