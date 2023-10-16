import axios from 'axios';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Agregar un interceptor de solicitud para actualizar el encabezado de Authorization antes de cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
