
import { getData, postData, putData } from "../../../router/router";

export const buscarDadosDePerfil = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
};

export const buscarEndereco = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}/endereco`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o endereço", error);
        throw error;
    }
}

export const atualizarEndereco = async (endereco, idEmpresa) => {
    try {
        const response = await postData(`empresas/endereco/${idEmpresa}`, endereco, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o endereço", error);
        throw error;
    }
}

export const atualizarDadosDePerfil = async (dados) => {
    try {
        const response = await putData(`usuarios/perfil`, dados, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar os dados da empresa", error);
        throw error;
    }
}

export const buscarNotificacoes = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}/notificacao`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as notificações", error);
        throw error;
    }
}

export const atualizarNotificacoes = async (idEmpresa, notificacoes) => {
    try {
        const response = await putData(`empresas/${idEmpresa}/notificacao`, notificacoes, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar as notificações", error);
        throw error;
    }
}
