import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

export default function IconBreadcrumbs({ paths }) {
    const navigate = useNavigate(); // Hook para navegar entre páginas

    const handleClick = (path) => {
        navigate(path); // Navega para o caminho especificado
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }} role="presentation">
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<span style={{ color: 'white' }}> / </span>} // Define a cor do separador
            >
                {paths.map((path, index) => (
                    <span
                        key={index}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            fontSize: '.7rem', 
                            color: 'white', 
                            cursor: 'pointer' 
                        }}
                        onClick={() => handleClick(path.href)} // Navega ao clicar
                    >
                        {path.label} {/* Exibe o rótulo do caminho */}
                    </span>
                ))}
            </Breadcrumbs>
        </div>
    );
}
