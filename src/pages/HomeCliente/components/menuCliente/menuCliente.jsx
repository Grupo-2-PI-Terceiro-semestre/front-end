import React from 'react';
import './menuCliente.css';
import { findByCategorias } from '../../../../router/homeClienteRoutes'


let categories = [
  "Salões de Beleza",
  "Barbearias",
  "Manicure & Nail Designer",
  "Esteticistas",
  "Sobrancelhas & Cílios"
];

try {
  const response = await findByCategorias(); // Faz a requisição e obtém os dados
  categories = response.map(categoria => categoria.nomeCategoria);
} catch (error) {
  console.error("Erro ao buscar categorias:", error);
  // categories mantém os valores padrão se ocorrer um erro
}

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
