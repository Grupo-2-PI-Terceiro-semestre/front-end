// src/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeEmpresa from './pages/HomeEmpresa/HomeEmpresa';
import HomeCliente from './pages/HomeCliente/HomeCliente';
import Servico from './pages/Servico/Servico';
import Login from './pages/Auth/Login/Login';
import Cadastro from './pages/Auth/Cadastro/Cadastro';
import Agenda from './pages/Agenda/Agenda';
import Perfil from './pages/Perfil/Perfil';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Equipe from './pages/Equipe/Equipe';
import ProtectedRoute from './ProtectedRoute'; // Importe o componente ProtectedRoute

const AppRoutes = ({ isAuthenticated }) => {
    return (
        <Routes>
            <Route path="/" element={<HomeEmpresa />} />
            <Route path="/cliente" element={<HomeCliente />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/servico" element={<ProtectedRoute element={<Servico />} isAuthenticated={isAuthenticated} />} />
            <Route path="/agenda" element={<ProtectedRoute element={<Agenda />} isAuthenticated={isAuthenticated} />} />
        <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} isAuthenticated={isAuthenticated} />} />
          {/*    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
            <Route path="/equipe" element={<ProtectedRoute element={<Equipe />} isAuthenticated={isAuthenticated} />} /> */}
        </Routes>
    );
};

export default AppRoutes;
