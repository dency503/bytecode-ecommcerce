/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


const PublicRoute = ({ isAuth, role, component: Component, path, ...rest }) => {


console.log(path)
  if (isAuth && role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" />;
  }

  if ((isAuth && role === 'USER') && (path === '/signin' || path === '/signup')) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="content">
      <Component {...rest} />
    </main>
  );
};

PublicRoute.defaultProps = {
  isAuth: false,
  role: 'USER',
  path: '/',
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool,
  role: PropTypes.string,
  
  path: PropTypes.string,
  
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || '',
});



export default connect(mapStateToProps)(PublicRoute);
