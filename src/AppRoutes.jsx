// src/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import HomeEmpresa from './pages/HomeEmpresa/HomeEmpresa';
import HomeCliente from './pages/HomeCliente/HomeCliente';
import Servico from './pages/Servico/Servico';
import Login from './pages/Auth/Login/Login';
import Cadastro from './pages/Auth/Cadastro/Cadastro';
import Agenda from './pages/Agenda/Agenda';
import Perfil from './pages/Perfil/Perfil';
import Dashboard from './pages/Dashboard/Dashboard';
import Clientes from './pages/Clientes/Clientes';
import Equipe from './pages/Equipe/Equipe';
import ProtectedRoute from './ProtectedRoute'; // Importe o componente ProtectedRoute
import PerfilEmpresa from './pages/Agendamento/PerfilEmpresa';



const AppRoutes = () => {

    const homeComponent = useMemo(() => {
        const last = localStorage.getItem('lastHomeType');
        const next = last === 'cliente' ? 'empresa' : 'cliente';
        return next === 'cliente' ? <HomeCliente /> : <HomeEmpresa />;
    }, []);

    return (
        <Routes>
            <Route path="/" element={homeComponent} />
            <Route path="/empresa" element={<HomeEmpresa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil/empresa/:idEmpresa" element={<PerfilEmpresa />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/servico" element={<ProtectedRoute element={<Servico />} />} />
            <Route path="/agenda" element={<ProtectedRoute element={<Agenda />} />} />
            <Route path="/perfil" element={<ProtectedRoute element={<Perfil />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/clientes" element={<ProtectedRoute element={<Clientes />} />} />
            <Route path="/equipe" element={<ProtectedRoute element={<Equipe />} />} />


        </Routes>
    );
};

export default AppRoutes;
