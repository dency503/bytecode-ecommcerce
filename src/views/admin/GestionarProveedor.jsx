import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import api from "../../utils/apiConfig";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarProveedores = () => {
  useDocumentTitle("Proveedores | Admin Bytecode");
  const [proveedores, setProveedores] = useState([]);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    // Add other fields as needed
  });
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [show, setShow] = useState(false);
  const [proveedorAEditar, setProveedorAEditar] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/proveedores`)
      .then((response) => {
        setProveedores(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener proveedores:", error);
        toast.error("Error al obtener proveedores");
      });
  };

  const handleEditarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setProveedorAEditar(proveedor);
    setShow(true);
  };

  const handleClose = () => {
    setProveedorAEditar(null);
    setProveedorSeleccionado(null);
    setShow(false);
  };

  const handleGuardarCambios = () => {
    if (proveedorAEditar) {
      // Editing existing provider
      api
        .put(`/proveedores/${proveedorAEditar.id}`, proveedorAEditar)
        .then((response) => {
          toast.success("Proveedor actualizado exitosamente");
          fetchData(); // Fetch data after successful update
          handleClose(); // Close the modal after updating
        })
        .catch((error) => {
          // Handle errors during update
          console.error("Error al actualizar el proveedor:", error);
          toast.error("Error al actualizar el proveedor");
        });
    } else {
      // Creating new provider
      api
        .post(`/proveedores`, newProveedor)
        .then((response) => {
          toast.success("Nuevo proveedor creado exitosamente");
          fetchData(); // Fetch data after successful creation
          handleClose(); // Close the modal after creating
        })
        .catch((error) => {
          // Handle errors during creation
          console.error("Error al crear el proveedor:", error);
          toast.error("Error al crear el proveedor");
        });
    }
  };

  const handleEliminarProveedor = (proveedorId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      api
        .delete(`/proveedores/${proveedorId}`)
        .then((response) => {
          toast.success("Proveedor eliminado exitosamente");
          fetchData(); // Fetch data after successful deletion
        })
        .catch((error) => {
          // Handle errors during deletion
          console.error("Error al eliminar el proveedor:", error);
          toast.error("Error al eliminar el proveedor");
        });
    }
  };

  return (
    <div>
      <h1>Gestión de Proveedores</h1>
      <Button variant="primary" onClick={() => setShow(true)}>
        Agregar Nuevo Proveedor
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Proveedor</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
              <td>
                <Button onClick={() => handleEditarProveedor(proveedor)}>Editar</Button>
                <Button variant="danger" onClick={() => handleEliminarProveedor(proveedor.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {proveedorSeleccionado ? "Editar" : "Crear"} Proveedor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form>
      <Form.Group controlId="formNombreProveedor">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={
            proveedorAEditar
              ? proveedorAEditar.nombre
              : newProveedor.nombre
          }
          onChange={(e) =>
            proveedorAEditar
              ? setProveedorAEditar({
                  ...proveedorAEditar,
                  nombre: e.target.value,
                })
              : setNewProveedor({
                  ...newProveedor,
                  nombre: e.target.value,
                })
          }
        />
      </Form.Group>

      <Form.Group controlId="formDireccionProveedor">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          value={
            proveedorAEditar
              ? proveedorAEditar.direccion
              : newProveedor.direccion
          }
          onChange={(e) =>
            proveedorAEditar
              ? setProveedorAEditar({
                  ...proveedorAEditar,
                  direccion: e.target.value,
                })
              : setNewProveedor({
                  ...newProveedor,
                  direccion: e.target.value,
                })
          }
        />
      </Form.Group>

      <Form.Group controlId="formTelefonoProveedor">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          value={
            proveedorAEditar
              ? proveedorAEditar.telefono
              : newProveedor.telefono
          }
          onChange={(e) =>
            proveedorAEditar
              ? setProveedorAEditar({
                  ...proveedorAEditar,
                  telefono: e.target.value,
                })
              : setNewProveedor({
                  ...newProveedor,
                  telefono: e.target.value,
                })
          }
        />
      </Form.Group>

      <Form.Group controlId="formEmailProveedor">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={
            proveedorAEditar
              ? proveedorAEditar.email
              : newProveedor.email
          }
          onChange={(e) =>
            proveedorAEditar
              ? setProveedorAEditar({
                  ...proveedorAEditar,
                  email: e.target.value,
                })
              : setNewProveedor({
                  ...newProveedor,
                  email: e.target.value,
                })
          }
        />
      </Form.Group>
      
      {/* Add other form fields for additional parameters */}
    </Form>
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            {proveedorSeleccionado ? "Guardar Cambios" : "Crear Proveedor"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default GestionarProveedores;
