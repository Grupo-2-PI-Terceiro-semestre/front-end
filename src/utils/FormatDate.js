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