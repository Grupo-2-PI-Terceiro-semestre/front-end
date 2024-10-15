import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Estilos específicos do componente

const SearchableDropdown = ({options, onSelectOption, placeholder, displayField, uniqueKey }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref para o dropdown

    // Filtrar opções com base na entrada do usuário
    const filteredOptions = inputValue === ''
        ? options
        : options.filter(option =>
            displayField(option).toLowerCase().includes(inputValue.toLowerCase())
        );

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true); 
    };

    const handleSelectOption = (option) => {
        setInputValue(displayField(option)); 
        onSelectOption(option); 
        setIsDropdownOpen(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="inputContainer">
            <div className="autocomplete" ref={dropdownRef}>
                <input
                    type="text"
                    placeholder={placeholder || 'Selecione uma opção'}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => {
                        setIsDropdownOpen(true);
                    }}
                />
                {isDropdownOpen && (
                    <ul className="dropdown-list">
                        {filteredOptions.map(option => (
                            <li
                                key={uniqueKey(option)}
                                onClick={() => handleSelectOption(option)}
                                className="dropdown-item"
                            >
                                {displayField(option)} 
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchableDropdown;
