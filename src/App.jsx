// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Cookies from 'js-cookie';
const projectName = 'Order Hub';
const version = __APP_VERSION__;

let color = 'black';

const AppVersion = () => {
  const location = useLocation();

  if (location.pathname !== '/login' && location.pathname !== '/cadastro') {
    color = 'white'
  }

  return (
    <div
      className="position-fixed top-0 start-0 p-0.5 name-version"
      style={{ zIndex: 1050, color: color }}
    >
      <p>
        {projectName}®️ - {version}
      </p>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o cookie do token existe
    const token = Cookies.get('token');

    // Para fins de teste, vamos definir como verdadeiro
    // Remova o comentário na linha abaixo se você realmente quer verificar o token
    // if (token) {
    //   setIsAuthenticated(true);
    // }

    setIsAuthenticated(true);

  }, []);

  return (
    <Router>
      <div>
        <AppVersion />
        <AppRoutes isAuthenticated={isAuthenticated} />
      </div>
    </Router>
  );
}

export default App;
