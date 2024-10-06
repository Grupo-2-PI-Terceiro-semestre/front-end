// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Cookies from 'js-cookie'; // Importa a biblioteca de cookies

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o cookie do token existe
    const token = Cookies.get('token');
    
/*     if (token) {
      setIsAuthenticated(true);
    } */

      setIsAuthenticated(true);

  }, []);

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;
