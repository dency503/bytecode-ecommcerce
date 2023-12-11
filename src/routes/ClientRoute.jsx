/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as ROUTES from "@/constants/routes";

const PrivateRoute = ({ isAuth, role, component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && role === "ADMIN") {
      // Redirect to admin dashboard for users with 'ADMIN' role
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuth, role, navigate]);

  // If the user is authenticated and not an admin, render the component
  return (
    <main className="content">
      <Component />
    </main>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
