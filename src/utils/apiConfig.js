import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
        console.log("el token es" + token);
        if (token) {
            const decodedToken = jwtDecode(token);
            const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos

            // Verificar si el token ha expirado
            if (Date.now() >= expirationDate) {
                // Token expirado, eliminar el token y manejar la lógica de redirección o mensaje al usuario
                localStorage.removeItem('token');
                // Puedes redirigir al usuario a la página de inicio de sesión u otra lógica aquí
                // return Promise.reject(new Error('Token expirado'));
            } else {
                config.headers['Authorization'] = `Bearer ${token}`;
                return config;
            }
        } else {
            // Si no hay token, puedes manejarlo aquí
            // Por ejemplo, redirigir al usuario a la página de inicio de sesión
            // o mostrar un mensaje indicando que se requiere inicio de sesión
            // return Promise.reject(new Error('No hay token disponible'));
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default api;
