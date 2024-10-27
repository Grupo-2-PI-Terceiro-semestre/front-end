import Cookies from 'js-cookie';
import { postData } from '../../router/router';

export const loginUser = async (userData) => {
    try {
        const response = await postData('usuarios/auth/login', userData);


        const token = response.headers['authorization'];

        if (token) {
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('user', JSON.stringify(response.data), { expires: 7 })
        }

        return response.data;
    } catch (error) {
        console.error("Erro de autenticação", error);
        throw error;
    }
};

export const cadastroUser = async (userData) => {
    try {
        const response = await postData('usuarios', userData);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário", error);
        throw error;
    }
};
