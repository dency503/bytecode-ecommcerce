/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';



const PrivateRoute = ({ isAuth, component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = () => {
      // Assuming you have a function to get the JWT token from wherever it's stored (e.g., localStorage)
      return localStorage.getItem('token');
    };

    const decodeToken = (token) => {
      try {
        return jwtDecode(token);
      } catch (error) {
        return null;
      }
    };

    const token = getToken();
    const decodedToken = token ? decodeToken(token) : null;

    // Check if the user is authenticated
    if ( !decodedToken) {
      navigate("/SIGNIN");
    } else if (decodedToken.role === 'ADMIN') {
      // Redirect to admin dashboard for users with 'ADMIN' role
      navigate("ADMIN_DASHBOARD");
    }
  }, [isAuth, navigate]);

  // If the user is authenticated and not an admin, render the component
  return isAuth ? (
    <main className="content">
      <Component />
    </main>
  ) : null;
};

PrivateRoute.defaultProps = {
  isAuth: false,
};

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
