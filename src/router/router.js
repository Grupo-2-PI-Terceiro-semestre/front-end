import axios from 'axios';
import Cookies from 'js-cookie';
import useAuth from '../router/useAuth';
import { Client } from '@stomp/stompjs';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_WS = import.meta.env.VITE_API_URL_WS;
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

// Declarações no escopo do módulo
let stompClient = null;
let subscriptions = {};

export const connectWebSocket = (onMessage, idEmpresa) => {
    return new Promise((resolve, reject) => {
        if (stompClient && stompClient.connected) {
            // Se já conectado, apenas adiciona nova subscription
            const topic = `/topic/${idEmpresa}/notifications`;
            if (!subscriptions[topic]) {
                const sub = stompClient.subscribe(topic, (message) => {
                    handleMessage(message, onMessage);
                });
                subscriptions[topic] = sub;
            }
            resolve(stompClient);
            return;
        }

        const socket = new WebSocket(`${API_URL_WS}`);

        socket.onclose = (e) => {
            console.error('SockJS fechado:', e);
            reject(new Error('Conexão fechada'));
        };

        stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => console.log('STOMP:', str),
            onConnect: () => {
                console.log('Conectado ao broker STOMP');

                // Inscreve no tópico específico da empresa
                const topic = `/topic/${idEmpresa}/notifications`;
                const sub = stompClient.subscribe(topic, (message) => {
                    handleMessage(message, onMessage);
                });

                subscriptions[topic] = sub;
                resolve(stompClient);
            },
            onStompError: (frame) => {
                console.error('Erro STOMP:', frame.headers.message);
                reject(new Error(frame.headers.message));
            },
            onWebSocketError: (error) => {
                console.error('Erro WebSocket:', error);
                reject(error);
            }
        });

        stompClient.activate();
    });
};

const handleMessage = (message, callback) => {
    try {
        let body;
        if (message.headers['content-type']?.includes('application/json')) {
            body = JSON.parse(message.body);
        } else {
            // Trata como texto simples
            body = { message: message.body };
        }

        callback(body);
    } catch (e) {
        console.error('Erro ao processar mensagem:', e);
    }
};

export const disconnectWebSocket = (idEmpresa = null) => {
    if (!stompClient) return;

    if (idEmpresa) {
        // Desconecta apenas um tópico específico
        const topic = `/topic/${idEmpresa}/notifications`;
        if (subscriptions[topic]) {
            subscriptions[topic].unsubscribe();
            delete subscriptions[topic];
        }
    } else {
        // Desconecta tudo
        Object.values(subscriptions).forEach(sub => sub.unsubscribe());
        subscriptions = {};
        if (stompClient.connected) {
            stompClient.deactivate();
        }
    }
};

