import React, { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs} from "react-bootstrap";
import axios from "axios";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useScrollTop from "../../hooks/useScrollTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistorialComprasTab from "./HistorialComprasTab";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faMoneyBillWave,
  faCreditCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DireccionEnvioTab from "./DireccionEnvioTab";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/redux/actions/profileActions";
import { ToastContainer } from "react-toastify";
const Account = () => {
  useDocumentTitle("Cuenta | ByteCode");

  const client = useSelector((state) => state.profile);
  const address = useSelector((state) => state.profile.direccion);
  useScrollTop();
  const initialValues = {
    nombreCliente: (client && client.nombreCliente) || "",
    apellidoCliente: (client && client.apellidoCliente) || "",
    email: (client && client.email) || "",
    telefono: (client && client.telefono) || "",
    // Otros campos de usuario
  };
  const formik = Yup.object({
    nombreCliente: Yup.string().required("El nombre es obligatorio"),
    apellidoCliente: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().email("Correo electrónico no válido"),
    telefono: Yup.string().matches(/^\d+$/, "Solo números permitidos"),
    // Agrega validaciones para otros campos según sea necesario
  });

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [key, setKey] = useState("personal");

  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const onSubmitForm = (values) => {
    dispatch(
      updateProfile({
        updates: {
          nombreCliente: values.nombreCliente,
          apellidoCliente: values.apellidoCliente,
          email: values.email,
          telefono: values.telefono,
        },
      })
    );
    setShowEditModal(false);
  };

  return (
    <div className="container section mt-5">
      <div className="row">
        <div className="col-md-12">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="personal" title="Información Personal">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Información Personal</h4>
                      <p className="card-text">
                        <strong>Nombre:</strong> {client.nombreCliente}
                      </p>
                      <p className="card-text">
                        <strong>Apellido:</strong> {client.apellidoCliente}
                      </p>
                      <p className="card-text">
                        <strong>País:</strong>{" "}
                        {client.direccion && client.direccion.pais}
                      </p>
                      <p className="card-text">
                        <strong>Teléfono:</strong> {client.telefono}
                      </p>
                      <Button variant="primary" onClick={handleEditClick}>
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="direccion" title="Dirección de Envío">
              <DireccionEnvioTab address={address} />
            </Tab>
            <Tab eventKey="compras" title="Historial de Compras">
              <HistorialComprasTab />
            </Tab>
          </Tabs>

          {/* Modal de Edición */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={initialValues}
                validateOnChange
                validationSchema={formik}
                onSubmit={onSubmitForm}
              >
                {() => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="nombreCliente">Nombre</label>
                      <Field
                        type="text"
                        id="nombreCliente"
                        name="nombreCliente"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="nombreCliente"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apellidoCliente">Apellido</label>
                      <Field
                        type="text"
                        id="apellidoCliente"
                        name="apellidoCliente"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="apellidoCliente"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico</label>
                      <Field
                        type="text"
                        id="email"
                        readOnly
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefono">Número de Teléfono</label>
                      <Field
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="telefono"
                        component="div"
                        className="error"
                      />
                    </div>
                    {/* Add other fields as needed */}
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cerrar
                      </Button>
                      <Button variant="primary" type="submit">
                        Guardar Cambios
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Account;
