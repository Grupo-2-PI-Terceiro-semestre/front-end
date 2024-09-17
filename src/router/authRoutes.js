import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/';
 // URL do seu backend

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}usuarios/auth/login`, userData);
    return response.data;
};

export const cadastroUser = async (userData) =>{
    debugger
    const response = await axios.post(`${API_URL}usuarios`, userData);
    return response.data;
}
