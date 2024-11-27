import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Estilos específicos do componente

const SearchableDropdown = ({
    options,
    onSelectOption,
    placeholder,
    displayField,
    uniqueKey,
    value,
    required,
    disabled,
    width = '95%'
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
        setSelectedOption(option);
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="inputContainer">
            <div style={{
                width: width
            }} className="autocomplete" ref={dropdownRef}>
                <input
                    type="text"
                    disabled={disabled}
                    required={required}
                    placeholder={placeholder || 'Selecione uma opção'}
                    value={inputValue ? inputValue : value}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                />
                {selectedOption === null && required && (
                    <input type="hidden" required />
                )}
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
