import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUpForm = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const obtenerDistritos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/distritos`);
        setDistritos(response.data.content);
      } catch (error) {
        console.error("Error al obtener distritos:", error);
      }
    };

    obtenerDistritos();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    nombreCliente: Yup.string().required("Nombre Cliente is required"),
    apellidoCliente: Yup.string().required("Apellido Cliente is required"),
    telefono: Yup.string().required("Teléfono is required"),

    codigoPostal: Yup.string().required("Código Postal is required"),
    pais: Yup.string().required("País is required"),
    linea1: Yup.string().required("Dirección is required"),
    departamentoId: Yup.string().required("Selecciona un departamento"),
    municipioId: Yup.string().required("Selecciona un municipio"),
    distrito: Yup.string().required("El distrito es obligatorio"),
  });
  useEffect(() => {
    // ... Código previo ...

    axios
      .get(`${apiUrl}/municipios?page=0&size=10000`)
      .then((response) => {
        setMunicipios(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de municipios:", error);
      });
    axios
      .get(`${apiUrl}/distritos?page=0&size=10000`)
      .then((response) => {
        setDistritos(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de distrito:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${apiUrl}/departamentos`)
      .then((response) => {
        setDepartamentos(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de departamentos:", error);
      });
  }, []);
  const onSubmit = async (values) => {
    try {
  
      const response = await axios.post(`${apiUrl}/v1/auth/signup`, {
        username: values.username,
        email: values.email,
        password: values.password,
        nombreCliente: values.nombreCliente,
        apellidoCliente: values.apellidoCliente,
        telefono: values.telefono,
        direccion: {
          linea1: values.linea1,
          distrito: {
            idDistrito: values.distrito,
            municipio: {
              idMunicipio: values.municipioId,
              departamento: {
                idDepartamento: values.departamentoId,
              },
            },
          },
          codigoPostal: values.codigoPostal,
          pais: values.pais,
        },
      });
      console.log("Signup Successful:", response.data);
      toast.success("Signup Successful");
      navigate("/signIn");
    } catch (error) {
      console.error("Error during signup:", error.response.data);
      toast.error("An error occurred during signup. Please try again.");
    } finally {
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="col-md-6">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              nombreCliente: "",
              apellidoCliente: "",
              telefono: "",
              codigoPostal: "",
              pais: "",
              linea1: "",
              distrito: "",
              municipioId: "",
              departamentoId: "",
            }}
            validationSchema={validationSchema}
            validateOnChange
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <i className="fas fa-user" aria-hidden="true"></i> Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope" aria-hidden="true"></i> Email
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock" aria-hidden="true"></i> Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="nombreCliente" className="form-label">
                    <i className="fas fa-user" aria-hidden="true"></i> Nombre
                    Cliente
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombreCliente"
                    name="nombreCliente"
                  />
                  <ErrorMessage
                    name="nombreCliente"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="apellidoCliente" className="form-label">
                    <i className="fas fa-user" aria-hidden="true"></i> Apellido
                    Cliente
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="apellidoCliente"
                    name="apellidoCliente"
                  />
                  <ErrorMessage
                    name="apellidoCliente"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    <i className="fas fa-phone" aria-hidden="true"></i> Teléfono
                  </label>
                  <ReactPhoneInput
                    inputProps={{
                      name: "telefono",
                      required: true,
                    }}
                    country="sv"
                    value={values.telefono}
                    onChange={(value) => setFieldValue("telefono", value)}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="telefono"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="codigoPostal" className="form-label">
                    Código Postal
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigoPostal"
                    name="codigoPostal"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="codigoPostal"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pais" className="form-label">
                    País
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="pais"
                    name="pais"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="pais" component="div" className="error" />
                </div>

                <div className="mb-3">
                  <label htmlFor="linea1" className="form-label">
                    Dirección
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="linea1"
                    name="linea1"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="linea1"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="departamento">Departamento</label>
                  <Field
                    as="select"
                    className="form-control"
                    id="departamento"
                    name="departamentoId"
                  >
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((departamento) => (
                      <option
                        key={departamento.idDepartamento}
                        value={departamento.idDepartamento}
                      >
                        {departamento.departamento}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="departamentoId"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="municipio">Municipio</label>
                  <Field
                    as="select"
                    className="form-control"
                    id="municipio"
                    name="municipioId"
                  >
                    <option value="">Selecciona un municipio</option>

                    {municipios
                      .filter(
                        (municipio) =>
                          municipio.departamento.idDepartamento ===
                          values.departamentoId
                      )
                      .map((municipio) => (
                        <option
                          key={municipio.idMunicipio}
                          value={municipio.idMunicipio}
                        >
                          {municipio.municipio}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="municipioId"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="distrito">Distrito</label>
                  <Field
                    as="select"
                    className="form-control"
                    id="distrito"
                    name="distrito"
                  >
                    <option value="">Selecciona un distrito</option>
                    {distritos
                      .filter(
                        (distrito) =>
                          distrito.municipio.idMunicipio === values.municipioId
                      )
                      .map((distrito) => (
                        <option
                          key={distrito.idDistrito}
                          value={distrito.idDistrito}
                        >
                          {distrito.distrito}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="distrito"
                    component="div"
                    className="error"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div
                      className="spinner-border text-light"
                      role="status"
                    ></div>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i> Sign Up
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
