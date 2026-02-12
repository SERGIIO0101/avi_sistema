import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Este interceptor pega el Token automáticamente en cada petición que hagamos
clienteAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default clienteAxios;