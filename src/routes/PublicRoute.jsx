import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';  // Asegúrate de instalar la biblioteca jwt-decode

import { SignInForm, SignUpForm } from '@/views';
import * as ROUTES from '@/constants/routes';
const PublicRoute = ({ isAuth, component: Component, path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, redirige a la página de inicio de sesión
      navigate(SignInForm);
      return;
    }

    try {
      // Decodifica el token para obtener la información, incluido el rol
      const decodedToken = jwtDecode(token);
     
      if ( decodedToken.role === 'ADMIN') {
        // Si es un administrador, redirige al panel de administrador
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (( decodedToken.role === 'USER') && (path === "/signup" || path === "/signin")) {
        // Si es un usuario y está intentando acceder a las páginas de inicio de sesión o registro, redirige a la página principal
        console.log("token "+decodedToken.role)
        navigate('/');
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
      // En caso de error al decodificar el token, maneja la situación según tus necesidades
      navigate(SignInForm);  // Puedes redirigir a la página de inicio de sesión por precaución
    }
  }, [isAuth, path, navigate]);

  return (
    <main className="content">
      <Component />
    </main>
  );
};

PublicRoute.defaultProps = {
  isAuth: false,
  path: '/'
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
};

export default PublicRoute;
