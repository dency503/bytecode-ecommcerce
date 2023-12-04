import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import api from "../../utils/apiConfig";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarMarca = () => {
  useDocumentTitle("Marcas | Admin Bytecode");
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [show, setShow] = useState(false);
  const [marcaAEditar, setMarcaAEditar] = useState(null);
  const [nuevaMarca, setNuevaMarca] = useState({
    nombreMarca: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/marcas`)
      .then((response) => {
        setMarcas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener marcas:", error);
        toast.error("Error al obtener marcas");
      });
  };

  const handleEditarMarca = (marca) => {
    setMarcaSeleccionada(marca);
    setMarcaAEditar({ ...marca });
    setShow(true);
  };

  const handleAgregarNuevaMarca = () => {
    setShow(true);
    
  };

  const handleGuardarCambios = () => {
    const isNewMarca = !marcaAEditar? 1:0;

    if (isNewMarca) {
      // Crear nueva marca
      console.log("nueva: " + nuevaMarca.nombreMarca);
      api
        .post(`/marcas`, nuevaMarca)
        .then((response) => {
          console.log("Marca creada exitosamente:", response.data);
          toast.success("Marca creada exitosamente");
          fetchData();
          setNuevaMarca({
            nombreMarca: "",
          });
        })
        .catch((error) => {
          console.error("Error al crear marca:", error);
          toast.error("Error al crear marca");
        });
    } else {
      // Actualizar marca existente

      api
        .put(`${apiUrl}/marcas/${marcaAEditar.marcaId}`, marcaAEditar)
        .then((response) => {
          console.log("Marca actualizada exitosamente:", response.data);
          toast.success("Marca actualizada exitosamente");
          fetchData();
        })
        .catch((error) => {
          console.error("Error al actualizar marca:", error);
          toast.error("Error al actualizar marca");
        });
    }

    handleClose();
  };

  const handleClose = () => {
    setMarcaAEditar(null);
    setMarcaSeleccionada(null);
    setShow(false);
  };

  const handleEliminarMarca = (id) => {
    api
      .delete(`/marcas/${id}`)
      .then((response) => {
        console.log("Marca eliminada exitosamente:", response.data);

        toast.success("Marca eliminada exitosamente");
        fetchData();
      })
      .catch((error) => {
        console.error("Error al eliminar marca:", error);
        toast.error("Error al eliminar marca");
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAgregarNuevaMarca}>
        Agregar Nueva Marca
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Marca</th>
            <th>Nombre de la Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.marcaId}>
              <td>{marca.marcaId}</td>
              <td>{marca.nombreMarca}</td>
              <td>
                <Button onClick={() => handleEditarMarca(marca)}>Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => handleEliminarMarca(marca.marcaId)}
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
            {marcaSeleccionada ? "Editar" : "Crear"} Marca
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMarcaId">
              <Form.Label>ID de Marca</Form.Label>
              <Form.Control
                type="text"
                value={marcaAEditar?.marcaId}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formNombreMarca">
              <Form.Label>Nombre de la Marca</Form.Label>
              <Form.Control
                type="text"
                value={
                  marcaAEditar
                    ? marcaAEditar.nombreMarca
                    : nuevaMarca.nombreMarca
                }
                onChange={(e) =>
                  marcaAEditar
                    ? setMarcaAEditar({
                        ...marcaAEditar,
                        nombreMarca: e.target.value,
                      })
                    : setNuevaMarca({
                        ...nuevaMarca,
                        nombreMarca: e.target.value,
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
            {marcaSeleccionada ? "Guardar Cambios" : "Crear Marca"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default GestionarMarca;
