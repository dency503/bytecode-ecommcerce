import axios from "axios";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { Tab, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/redux/actions/profileActions";
import * as Yup from "yup";
import { updateAddress } from "../../redux/actions/profileActions";
import { ToastContainer } from "react-toastify";
const DireccionEnvioTab = ({ address }) => {
  const [showAddressEditModal, setShowAddressEditModal] = useState(false);
  const [filteredMunicipios, setFilteredMunicipios] = useState([]);

  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistrito] = useState([]);
  const onSubmit = (form) => {
    console.log("holaa");
    dispatch(
      updateAddress({
        updates: {
          departamentoId: form?.departamentoId || "",
          municipioId: form?.municipioId || "",
          distrito: form?.distrito || "",
          linea1: form?.linea1 || "",
          codigoPostal: form?.codigoPostal || "",
          pais: "El Salvador",
        },
      })
    );
    setShowAddressEditModal(null);
  };

  const formik = Yup.object({
    departamentoId: Yup.string().required("Selecciona un departamento"),
    municipioId: Yup.string().required("Selecciona un municipio"),
    distrito: Yup.string().required("El distrito es obligatorio"),
    linea1: Yup.string().required("La línea 1 es obligatoria"),
    codigoPostal: Yup.string().required("El código postal es obligatorio"),
  });
  const initFormikValues = {
    departamentoId:
      address?.distrito?.municipio?.departamento?.idDepartamento || "",
    municipioId: address?.distrito?.municipio?.idMunicipio || "",
    distrito: address?.distrito?.idDistrito || "",
    linea1: address?.linea1 || "",
    codigoPostal: address?.codigoPostal || "",
  };
  useEffect(() => {
    // ... Código previo ...

    if (address.departamentoId !== "") {
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
          setDistrito(response.data.content);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de distrito:", error);
        });
    }
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
  return (
    <>
      {address && (
        <div className="card mt-3">
          <div className="card-body">
            <h4 className="card-title">Dirección de Envío</h4>
            <p className="card-text">
              <strong>Linea 1:</strong> {address?.linea1}
            </p>
            <p className="card-text">
              <strong>Distrito:</strong> {address.distrito?.distrito}
            </p>
            <p className="card-text">
              <strong>Municipio:</strong>{" "}
              {address.distrito?.municipio.municipio}
            </p>
            <p className="card-text">
              <strong>Departamento:</strong>{" "}
              {address.distrito?.municipio.departamento.departamento}
            </p>
            <p className="card-text">
              <strong>Código Postal:</strong> {address.codigoPostal}
            </p>
            <Button
              variant="primary"
              onClick={() => setShowAddressEditModal(true)}
            >
              Editar
            </Button>
          </div>
        </div>
      )}
      <Modal
        show={showAddressEditModal}
        onHide={() => setShowAddressEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Dirección de Envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={formik}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
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
                    {console.log(
                      "values.departamentoId:",
                      values.departamentoId
                    )}
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
                <div className="form-group">
                  <label htmlFor="linea1">Línea 1</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="linea1"
                    name="linea1"
                  />
                  <ErrorMessage
                    name="linea1"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="codigoPostal">Código Postal</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="codigoPostal"
                    name="codigoPostal"
                  />
                  <ErrorMessage
                    name="codigoPostal"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Add other fields as needed */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddressEditModal(false)}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default DireccionEnvioTab;
