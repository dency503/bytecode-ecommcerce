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
        console.log("el token es" + token
         )
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        } else {
            // Si no hay token, puedes manejarlo aquí
            // Por ejemplo, redirigir al usuario a la página de inicio de sesión
            // o mostrar un mensaje indicando que se requiere inicio de sesión
            //return Promise.reject(new Error('No hay token disponible'));
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Agregar un interceptor de respuesta para manejar el código de estado 401 (No autorizado)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            // Eliminar el token si ha expirado o es inválido
            localStorage.removeItem('token');
            // Redireccionar a la página de inicio de sesión u otra lógica
            // Puedes hacer redireccionamiento o mostrar un mensaje al usuario aquí
        }
        return Promise.reject(error);
    }
);

export default api;
