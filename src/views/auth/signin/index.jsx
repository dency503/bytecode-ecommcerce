import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { useUserCart } from "../../../hooks/UserCartProvider";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticating, setAuthStatus } from "@/redux/actions/miscActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import { signIn } from '@/redux/actions/authActions';

import * as Yup from "yup";
import { signIn } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});
const SignInForm = () => {
  const { fetchData } = useUserCart();

  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const dispatch = useDispatch();

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  useEffect(
    () => () => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthenticating(false));
    },
    []
  );
  const handleSubmit = (form) => {
    console.log("no hace nada");
    dispatch(signIn(form.email, form.password));
  };

  return (
    <div className="container mt-5">
      {authStatus?.success &&
        toast.success(
          <div className="toast-success">
            {authStatus.message}
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              style={{ marginLeft: "8px" }}
            />
          </div>,
          {
            autoClose: 5000, // Close the toast after 5 seconds
            hideProgressBar: true, // Hide the progress bar
          }
        )}
      ;
      {authStatus?.message && (
        <h5 className="text-center toast-error">{authStatus?.message}</h5>
      )}
      {!authStatus?.success && (
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="col-md-6">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope" aria-hidden="true"></i> Email
                  </label>
                  <Field
                    disabled={isAuthenticating}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    name="email"
                    autoComplete="username"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock" aria-hidden="true"></i> Password
                  </label>
                  <Field
                    disabled={isAuthenticating}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button
                  className="btn btn-primary"
                  disabled={isAuthenticating}
                  type="submit"
                >
                  {isAuthenticating ? "Signing In" : "Sign In"}
                  &nbsp;
                </button>
              </Form>
            </Formik>
            <div className="mt-3">
              <p>
                ¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
