import React from 'react';
import './CategoryBar.css'; 

const categories = [
  'Salões de Beleza',
  'Barbearias',
  'Manicure & Nail Designer',
  'Esteticistas',
  'Sobrancelhas & Cílios',
  'Spa & Massagem',
  'Make Up',
  'Saúde & Bem-estar',
  'Mais...'
];

const CategoryBar = () => {
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

export default CategoryBar;
