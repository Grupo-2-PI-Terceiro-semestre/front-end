import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', import.meta.env.VITE_API_URL);


export const getData = async (endpoint, pathParams = {}, queryParams = {}) => {
    try {
        const token = Cookies.get('token');

        let formattedEndpoint = endpoint;
        for (const [key, value] of Object.entries(pathParams)) {
            formattedEndpoint = formattedEndpoint.replace(`:${key}`, value);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = queryString ? `${API_URL}${formattedEndpoint}?${queryString}` : `${API_URL}${formattedEndpoint}`;

        const response = await axios.get(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'  
            }
        });

        return response;
    } catch (error) {
        console.error(`Erro ao fazer GET no endpoint ${formattedEndpoint}:`, error);
        throw error;
    }
};

export const postData = async (endpoint, data, pathParams = {}, queryParams = {}) => {
    try {
        let formattedEndpoint = endpoint;
        for (const [key, value] of Object.entries(pathParams)) {
            formattedEndpoint = formattedEndpoint.replace(`:${key}`, value);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = queryString ? `${API_URL}${formattedEndpoint}?${queryString}` : `${API_URL}${formattedEndpoint}`;

        const token = Cookies.get('token');

        const response = await axios.post(urlWithParams, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error(`Erro ao fazer POST em ${formattedEndpoint}:`, error);
        throw error;
    }
};

export const putData = async (endpoint, data, pathParams = {}, queryParams = {}) => {
    try {
        let formattedEndpoint = endpoint;
        for (const [key, value] of Object.entries(pathParams)) {
            formattedEndpoint = formattedEndpoint.replace(`:${key}`, value);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = queryString ? `${API_URL}${formattedEndpoint}?${queryString}` : `${API_URL}${formattedEndpoint}`;

        const token = Cookies.get('token');

        const response = await axios.put(urlWithParams, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error(`Erro ao fazer PUT em ${formattedEndpoint}:`, error);
        throw error;
    }
};

export const deleteData = async (endpoint, pathParams = {}, queryParams = {}) => {
    try {
        let formattedEndpoint = endpoint;
        for (const [key, value] of Object.entries(pathParams)) {
            formattedEndpoint = formattedEndpoint.replace(`:${key}`, value);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = queryString ? `${API_URL}${formattedEndpoint}?${queryString}` : `${API_URL}${formattedEndpoint}`;

        const token = Cookies.get('token');

        const response = await axios.delete(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error(`Erro ao fazer DELETE em ${formattedEndpoint}:`, error);
        throw error;
    }
};

