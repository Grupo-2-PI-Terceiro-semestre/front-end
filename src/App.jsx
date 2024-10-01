import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeEmpresa from './pages/HomeEmpresa/HomeEmpresa';
import HomeCliente from './pages/HomeCliente/HomeCliente';
import Login from './pages/Auth/Login/Login';
import Cadastro from './pages/Auth/Cadastro/Cadastro';
import Agenda from './pages/Agenda/Agenda'
import Perfil from './pages/Perfil/Perfil';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeEmpresa />} />
        <Route path="/cliente" element={<HomeCliente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}
 
export default App;