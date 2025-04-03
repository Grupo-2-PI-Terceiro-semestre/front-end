import axios from 'axios';
import Cookies from 'js-cookie';
import useAuth from '../router/useAuth';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', import.meta.env.VITE_API_URL);
const { sessionExpired } = useAuth();

if (!import.meta.env.PROD) {
    console.log('API URL:', import.meta.env.VITE_API_URL);
    console.log('NODE_ENV:', JSON.stringify(import.meta.env));
}

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
        if (error.status === 401) {
            sessionExpired();
        }
        throw error;
    }
};

export const postData = async (endpoint, data, pathParams = {}, queryParams = {}) => {
    let formattedEndpoint = endpoint;
    try {
        for (const [key, value] of Object.entries(pathParams)) {
            formattedEndpoint = formattedEndpoint.replace(`:${key}`, value);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = queryString ? `${API_URL}${formattedEndpoint}?${queryString}` : `${API_URL}${formattedEndpoint}`;
        let headers = {
            'Content-Type': 'application/json'
        }

        const token = Cookies.get('token') == undefined ? null : Cookies.get('token');


        if (token != null) {
            headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post(urlWithParams, data, {
            headers: headers
        });

        return response;
    } catch (error) {
        if (error.status === 401) {
            sessionExpired();
        }
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
        if (error.status === 401) {
            sessionExpired();
        }
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
        if (error.status === 401) {
            sessionExpired();
        }
        throw error;
    }
};


export const postImage = async (endpoint, data, pathParams = {}, queryParams = {}) => {
    let formattedEndpoint = endpoint;
    try {
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
        if (error.status === 401) {
            sessionExpired();
        }
        throw error;
    }
};

