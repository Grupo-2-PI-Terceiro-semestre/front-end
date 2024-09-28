import React from 'react';
import './Paralax.css';

const Paralax = ({ hasParalax, children }) => {
    return (
        <div className={hasParalax ? 'paralax-active' : 'paralax-inactive'}>
            {children}
        </div>
    );
};

export default Paralax;