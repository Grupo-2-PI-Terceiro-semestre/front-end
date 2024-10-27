// src/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializa com null

    useEffect(() => {
        const token = Cookies.get('token');
        setIsAuthenticated(!!token); // Define como true/false dependendo da presença do token
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
