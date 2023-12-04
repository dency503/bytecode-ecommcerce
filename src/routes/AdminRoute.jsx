/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // You may need to install this library
import Sidebar from '../views/admin/SideBar';
import { Container, Row } from 'react-bootstrap';

// import { AdminSideBar } from '@/components/common';

const AdminRoute = ({ isAuth, component: Component, ...rest }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = getToken();
    const decodedToken = token ? decodeToken(token) : null;
    console.log("el usuario es "+ decodedToken);
    if ( !decodedToken || (decodedToken && decodedToken.role !== 'ADMIN')) {
      
      

      navigate('/');
    }
  }, [ navigate]);

  return (
    <Container fluid>
      <Row>
       
        <Sidebar/>
        

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Component {...rest} />
        </main>
      </Row>
    </Container>
  );
};


AdminRoute.propTypes = {
  
  component: PropTypes.elementType.isRequired,
};

export default AdminRoute;
