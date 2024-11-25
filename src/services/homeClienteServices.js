import { getData } from '../router/router';

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

