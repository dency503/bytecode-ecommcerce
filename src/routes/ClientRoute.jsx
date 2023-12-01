/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from '@/constants/routes';

const PublicRoute = ({
  isAuth, role, component: Component, path, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const { from } = props.location.state || { from: { pathname: '/' } };

      // Redirect to admin dashboard if the user is an admin
      if (isAuth && role === 'ADMIN') {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      // Redirect to the previous page after successful signin/signup for regular users
      if ((isAuth && role === 'USER') && (path === SIGNIN || path === SIGNUP)) {
        return <Redirect to={from} />;
      }

      // Render the component in the main content area
      return (
        <main className="content">
          <Component {...props} />
        </main>
      );
    }}
  />
);

PublicRoute.defaultProps = {
  isAuth: false,
  role: 'USER',
  path: '/',
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool,
  role: PropTypes.string,
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  rest: PropTypes.any,
};


export default PublicRoute;
