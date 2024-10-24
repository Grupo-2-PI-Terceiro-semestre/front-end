import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import './style.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

addLocale('br', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'Hoje',
    clear: 'Limpar'
});

export default function IconDemo({content, onDateChange }) {
    const [date, setDate] = useState(null); 

    const handleDateChange = (e) => {
        setDate(e.value); 
        onDateChange(e.value); 
    };

    return (
        <div className="calendar-input">
            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                Agenda
            </label>
            <Calendar
                value={date}
                onChange={handleDateChange} 
                locale="br"
                id="buttondisplay"
                className="custom-calendar" 
                placeholder={content}
                dateFormat="dd/mm/yy"
                inputStyle={{ width: '100%' }}
            />
        </div>
    );
}
