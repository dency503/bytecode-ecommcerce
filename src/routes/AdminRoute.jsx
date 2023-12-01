/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AdminNavigation, AdminSideBar } from '@/components/common';
import PropTypes from 'prop-types';
import React from 'react';

import { Navigate, Route } from 'react-router-dom';

const AdminRoute = ({
  isAuth, role, component: Component, ...rest
}) => (
  <Route
    {...rest}
    element={(
      isAuth && role === 'ADMIN' ? (
        <>
          <AdminNavigation />
          <main className="content-admin">
            <AdminSideBar />
            <div className="content-admin-wrapper">
              <Component />
            </div>
          </main>
        </>
      ) : <Navigate to="/" replace />
    )}
  />
);


AdminRoute.defaultProps = {
  isAuth: false,
  role: 'USER'
};

AdminRoute.propTypes = {
  isAuth: PropTypes.bool,
  role: PropTypes.string,
  component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  rest: PropTypes.any
};

export default AdminRoute;
