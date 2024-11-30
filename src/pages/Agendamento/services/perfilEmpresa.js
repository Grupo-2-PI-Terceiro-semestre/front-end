import { getData, postData } from '../../../router/router'

export const buscarDadosDePerfil = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/perfil/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
}

export const buscarHorariosDisponiveis = async (idEmpresa, idProfissional, data, idServico) => {
    try {
        const response = await getData(`agendas/horarios-indisponiveis/empresa/${idEmpresa}`, {}, { idProfissional, data, idServico });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar horários disponíveis", error);
        throw error;
    }
}

export const agendarHorario = async (agendamento) => {
    try {
        const response = await postData('agendamentos/cliente', agendamento);
        return response.data;
    } catch (error) {
        console.error("Erro ao agendar horário", error);
        throw error;
    }
}