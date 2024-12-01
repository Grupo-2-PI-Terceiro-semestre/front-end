export const converterGMTParaBrasilia = (horarioGMT) => {
    const data = new Date(horarioGMT);

    if (isNaN(data.getTime())) {
        throw new Error("Horário inválido");
    }

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
}


export const formatDuration = (duration) => {
    if (duration.length === 8) {
        return duration.slice(0, 5);
    }
    return duration;
};


export const formatDateToBRWithMonthName = (dateString) => {

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Fev',
        'Mar', 'Abr',
        'Mai', 'Jun',
        'Jul', 'Ago',
        'Set', 'Out',
        'Nov', 'Dez'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
}

export const formaterDate = (date) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return localDate.toISOString().split('T')[0];
}

export const formatDateTimeForBackend = (date, time) => {
    // Cria um objeto Date baseado na string da data
    const dataObj = new Date(date);

    // Extrai partes da data
    const year = dataObj.getFullYear();
    const month = String(dataObj.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const day = String(dataObj.getDate()).padStart(2, '0');

    // Formata o resultado no padrão ISO-8601
    return `${year}-${month}-${day}T${time}`;
};

export const formatDateTimeForDisplay = (isoDateTime) => {
    if (!isoDateTime) return '';

    const [datePart, timePart] = isoDateTime.split('T');
    const [year, month, day] = datePart.split('-');
    const time = timePart?.slice(0, 5);

    return `${day}/${month}/${year} às ${time}`;
};