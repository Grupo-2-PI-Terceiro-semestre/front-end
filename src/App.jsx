import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeEmpresa from './pages/HomeEmpresa/HomeEmpresa';
import HomeCliente from './pages/HomeCliente/HomeCliente';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeEmpresa />} />
        <Route path="/cliente" element={<HomeCliente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}
 
export default App;