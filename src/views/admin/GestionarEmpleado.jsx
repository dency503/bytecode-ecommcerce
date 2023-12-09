import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarEmpleado = () => {
  useDocumentTitle("Empleados | Admin Bytecode");
  const [loading, setLoading] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [show, setShow] = useState(false);
  const [empleadoAEditar, setEmpleadoAEditar] = useState(null);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/empleados`);
      setEmpleados(response.data.content);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch employees on component mount

    fetchData();
  }, []);

  const handleEditarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setEmpleadoAEditar({ ...empleado });
    setShow(true);
    fetchData();
  };

  const handleClose = () => {
    setEmpleadoAEditar(null);
    setEmpleadoSeleccionado(null);
    setShow(false);
  };

  const handleGuardarCambios = () => {
    api
      .put(`/empleados/${empleadoAEditar.empleadoId}`, empleadoAEditar)
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
        toast.success("Empleado actualizado exitosamente");
        handleClose();
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        toast.error("Error al actualizar empleado");
      });
  };
  const handleEliminarEmpleado = (empleadoId) => {
    api
      .delete(`${apiUrl}/empleados/${empleadoId}`)
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        toast.success("Empleado eliminado exitosamente");
        fetchData();
      })
      .then((response) => {
        setEmpleados(response.data.content);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        toast.error("Error al eliminar empleado");
      });
  };
  const handleCrearEmpleado = () => {
    api
      .post(`${apiUrl}/empleados`, nuevoEmpleado)
      .then((response) => {
        console.log("Employee created successfully:", response.data);
        toast.success("Empleado creado exitosamente");
        fetchData();
      })
      .then((response) => {
        setEmpleados(response.data.content);
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        toast.error("Error al crear empleado");
      });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Empleado</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Fecha de Contratación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados &&
            empleados.map((empleado) => (
              <tr key={empleado.empleadoId}>
                <td>{empleado.empleadoId}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.email}</td>
                <td>
                  {new Date(empleado.fechaContratacion).toLocaleDateString()}
                </td>
                <td>
                  <Button onClick={() => handleEditarEmpleado(empleado)}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "¿Estás seguro de que deseas eliminar este empleado?"
                        )
                      ) {
                        handleEliminarEmpleado(empleado.empleadoId);
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Button onClick={() => setShow(true)}>Crear Nuevo Empleado</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {empleadoAEditar ? "Editar Empleado" : "Crear Nuevo Empleado"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {empleadoAEditar && (
              <Form.Group controlId="formEmpleadoId">
                <Form.Label>ID de Empleado</Form.Label>
                <Form.Control
                  type="text"
                  value={empleadoAEditar.empleadoId}
                  readOnly
                />
              </Form.Group>
            )}

            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={
                  empleadoAEditar
                    ? empleadoAEditar.nombre
                    : nuevoEmpleado.nombre
                }
                onChange={(e) =>
                  empleadoAEditar
                    ? setEmpleadoAEditar({
                        ...empleadoAEditar,
                        nombre: e.target.value,
                      })
                    : setNuevoEmpleado({
                        ...nuevoEmpleado,
                        nombre: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={
                  empleadoAEditar
                    ? empleadoAEditar.apellido
                    : nuevoEmpleado.apellido
                }
                onChange={(e) =>
                  empleadoAEditar
                    ? setEmpleadoAEditar({
                        ...empleadoAEditar,
                        apellido: e.target.value,
                      })
                    : setNuevoEmpleado({
                        ...nuevoEmpleado,
                        apellido: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={
                  empleadoAEditar ? empleadoAEditar.email : nuevoEmpleado.email
                }
                onChange={(e) =>
                  empleadoAEditar
                    ? setEmpleadoAEditar({
                        ...empleadoAEditar,
                        email: e.target.value,
                      })
                    : setNuevoEmpleado({
                        ...nuevoEmpleado,
                        email: e.target.value,
                      })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={
              empleadoAEditar ? handleGuardarCambios : handleCrearEmpleado
            }
          >
            {empleadoAEditar ? "Guardar Cambios" : "Crear Empleado"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default GestionarEmpleado;
