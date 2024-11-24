import React, { useState, useEffect } from 'react';
import './MenuCategorias.css';
import { findByCategorias, findEmpresasPorCategoria } from '../../../../services/homeClienteServices';

const MenuCategorias = ({ onSearchResults, setLoading }) => {
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

  const handleClickByCategoria = async (categoria) => {
    try {
      setLoading(true)
      const response = await findEmpresasPorCategoria(categoria)
      onSearchResults(response)
    }
    catch (e) {
      console.error("Erro ao buscar empresas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-bar">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li onClick={() => handleClickByCategoria(category)} key={index} className="category-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCategorias;
