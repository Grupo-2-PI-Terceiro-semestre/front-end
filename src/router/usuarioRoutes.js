import Cookies from 'js-cookie';

import { postData } from './router';

export const loginUser = async (userData) => {
    try {
        const response = await postData('usuarios/auth/login', userData);


        const token = response.headers['authorization'];

        if (token) {
            Cookies.set('token', token, { expires: 7 });
        }

        return response.data;
    } catch (error) {
        console.error("Erro de autenticação", error);
        throw error;
    }
};

export const cadastroUser = async (userData) => {
    return await postData('usuarios', userData);
};