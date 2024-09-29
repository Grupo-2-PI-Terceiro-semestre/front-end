import React, { useState, useEffect } from 'react';
import './MenuCategorias.css';
import { findByCategorias } from '../../../../services/homeClienteServices';

const MenuCategorias = () => {
  const [categories, setCategories] = useState([
    "Salões de Beleza",
    "Barbearias",
    "Manicure & Nail Designer",
    "Esteticistas",
    "Sobrancelhas & Cílios"
  ]);

  const fetchCategories = async () => {
    try {
      const response = await findByCategorias();
      setCategories(response.map(categoria => categoria.nomeCategoria));
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

export default MenuCategorias;
