import { getData, postData } from '../router/router';

export const findByCategorias = async () => {
    try {
        const response = await getData('categorias');
        return response.data;
    } catch (error) {
        console.error("Erro de autenticação", error);
        throw error;
    }
};

export const findByServicoOuEmpresa = async (termo) => {
    try {
        const response = await getData('empresas/buscar', {}, { termo })
        return response.data;
    } catch (error) {

    }
}

export const findEmpresasPorCategoria = async (categoria) => {
    try {
        const response = await getData(`empresas/buscar/categoria/${categoria}`, {}, {})
        return response.data;
    } catch (error) {

    }
}

export const cadastrarCliente = async (cliente) => {
    try {
        const response = await postData('clientes', cliente);
        return response.data;
    } catch (error) {
        console.error("Erro de autenticação", error);
        throw error;
    }
}

export const loginCliente = async (cliente) => {
    try {
        const response = await postData('clientes/auth/login', cliente);
        return response.data;
    } catch (error) {
        console.error("Erro de autenticação", error);
        throw error;
    }
}

export const buscarAgendamentos = async (idCliente) => {
    try {
        const response = await getData(`agendamentos/cliente/${idCliente}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar agendamentos", error);
        throw error;
    }
}

