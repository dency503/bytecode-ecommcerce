// GestionarCliente.jsx

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import api from "../../utils/apiConfig";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarCliente = () => {
  useDocumentTitle("Clientes | Admin Bytecode");
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    email: "",
    telefono: "",
    // Add other fields as needed
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [show, setShow] = useState(false);
  const [clienteAEditar, setClienteAEditar] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/clientes`);
      setClientes(response.data.content);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      toast.error("Error al obtener clientes");
    }
  };

  const handleEditarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setClienteAEditar(cliente);
    setShow(true);
  };

  const handleClose = () => {
    setClienteAEditar(null);
    setClienteSeleccionado(null);
    setShow(false);
  };

  const handleGuardarCambios = async () => {
    try {
      if (clienteAEditar) {
        // Editing existing client
        await api.put(`${apiUrl}/clientes/${clienteAEditar.clienteId}`, clienteAEditar);
        toast.success("Cliente actualizado exitosamente");
      } else {
        // Creating new client
        await axios.post(`${apiUrl}/clientes`, newCliente);
        toast.success("Nuevo cliente creado exitosamente");
      }
      fetchData(); // Fetch data after successful update or creation
      handleClose(); // Close the modal after updating or creating
    } catch (error) {
      // Handle errors during update or creation
      console.error("Error al guardar cambios del cliente:", error);
      toast.error("Error al guardar cambios del cliente");
    }
  };

  const handleEliminarCliente = async (clienteId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await axios.delete(`${apiUrl}/clientes/${clienteId}`);
        toast.success("Cliente eliminado exitosamente");
        fetchData(); // Fetch data after successful deletion
      } catch (error) {
        // Handle errors during deletion
        console.error("Error al eliminar el cliente:", error);
        toast.error("Error al eliminar el cliente");
      }
    }
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <Button variant="primary" onClick={() => setShow(true)}>
        Agregar Nuevo Cliente
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Cliente</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.clienteId}>
              <td>{cliente.clienteId}</td>
              <td>{cliente.nombreCliente}</td>
              <td>{cliente.apellidoCliente}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>
                <Button onClick={() => handleEditarCliente(cliente)}>Editar</Button>
                <Button variant="danger" onClick={() => handleEliminarCliente(cliente.clienteId)}>
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
            {clienteSeleccionado ? "Editar" : "Crear"} Cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreCliente">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={
                  clienteAEditar
                    ? clienteAEditar.nombreCliente
                    : newCliente.nombreCliente
                }
                onChange={(e) =>
                  clienteAEditar
                    ? setClienteAEditar({
                        ...clienteAEditar,
                        nombreCliente: e.target.value,
                      })
                    : setNewCliente({
                        ...newCliente,
                        nombreCliente: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formApellidoCliente">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={
                  clienteAEditar
                    ? clienteAEditar.apellidoCliente
                    : newCliente.apellidoCliente
                }
                onChange={(e) =>
                  clienteAEditar
                    ? setClienteAEditar({
                        ...clienteAEditar,
                        apellidoCliente: e.target.value,
                      })
                    : setNewCliente({
                        ...newCliente,
                        apellidoCliente: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEmailCliente">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={
                  clienteAEditar
                    ? clienteAEditar.email
                    : newCliente.email
                }
                onChange={(e) =>
                  clienteAEditar
                    ? setClienteAEditar({
                        ...clienteAEditar,
                        email: e.target.value,
                      })
                    : setNewCliente({
                        ...newCliente,
                        email: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formTelefonoCliente">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={
                  clienteAEditar
                    ? clienteAEditar.telefono
                    : newCliente.telefono
                }
                onChange={(e) =>
                  clienteAEditar
                    ? setClienteAEditar({
                        ...clienteAEditar,
                        telefono: e.target.value,
                      })
                    : setNewCliente({
                        ...newCliente,
                        telefono: e.target.value,
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
            {clienteSeleccionado ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default GestionarCliente;
