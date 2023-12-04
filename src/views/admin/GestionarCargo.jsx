import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import api from "../../utils/apiConfig";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarCargo = () => {
  useDocumentTitle("Cargos | Admin Bytecode");
  const [cargos, setCargos] = useState([]);
  const [newCargo, setNewCargo] = useState({
    nombreCargo: "",
    // Add other fields as needed
  });
  const [cargoSeleccionado, setCargoSeleccionado] = useState(null);
  const [show, setShow] = useState(false);
  const [cargoAEditar, setCargoAEditar] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/cargos`)
      .then((response) => {
        setCargos(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener cargos:", error);
        toast.error("Error al obtener cargos");
      });

    // Fetch employees
  };

  const handleEditarCargo = (cargo) => {
    setCargoSeleccionado(cargo);
    setCargoAEditar(cargo);
    setShow(true);
  };

  const handleClose = () => {
    setCargoAEditar(null);
    setCargoSeleccionado(null);
    setShow(false);
  };
  const handleEliminarCargo = (cargoId) => {
    // Editing existing cargo
    api
      .delete(`/cargos/${cargoId}`)
      .then((response) => {
        toast.success("Cargo eliminar exitosamente");
        fetchData();
        handleClose();
      })
      .catch((error) => {
        // ... (your existing error handling)
        toast.error("Error al eliminar el cargo");
      });
  };
  const handleGuardarCambios = () => {
    if (cargoAEditar) {
      // Editing existing cargo
      api
        .put(`/cargos/${cargoAEditar.cargoId}`, cargoAEditar)
        .then((response) => {
          toast.success("Cargo actualizado exitosamente");
          fetchData(); // Fetch data after successful update
          handleClose(); // Close the modal after updating
        })
        .catch((error) => {
          // ... (your existing error handling)
          toast.error("Error al actualizar el cargo");
        });
    } else {
      // Creating new cargo
      api
        .post(`/cargos`, newCargo)
        .then((response) => {
          toast.success("Nuevo cargo creado exitosamente");
          fetchData(); // Fetch data after successful creation
          handleClose(); // Close the modal after creating
        })
        .catch((error) => {
          // ... (your error handling for creating a new cargo)
          toast.error("Error al crear el cargo");
        });
    }
  };

  return (
    <div>
      <h1>Gestión de Cargos</h1>
      <Button variant="primary" onClick={() => setShow(true)}>
        Agregar Nuevo Cargo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Cargo</th>
            <th>Nombre de Cargo</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map((cargo) => (
            <tr key={cargo.id}>
              <td>{cargo.cargoId}</td>
              <td>{cargo.nombreCargo}</td>

              <td>
                <Button onClick={() => handleEditarCargo(cargo)}>Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estás seguro de que deseas eliminar este cargo?"
                      )
                    ) {
                      handleEliminarCargo(cargo.cargoId);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cargoSeleccionado ? "Editar" : "Crear"} Cargo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Existing form fields */}
            <Form.Group controlId="formNombreCargo">
              <Form.Label>Nombre de Cargo</Form.Label>
              <Form.Control
                type="text"
                value={
                  cargoAEditar ? cargoAEditar.nombreCargo : newCargo.nombreCargo
                }
                onChange={(e) =>
                  cargoAEditar
                    ? setCargoAEditar({
                        ...cargoAEditar,
                        nombreCargo: e.target.value,
                      })
                    : setNewCargo({
                        ...newCargo,
                        nombreCargo: e.target.value,
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
          <Button variant="primary" onClick={handleGuardarCambios}>
            {cargoSeleccionado ? "Guardar Cambios" : "Crear Cargo"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default GestionarCargo;
