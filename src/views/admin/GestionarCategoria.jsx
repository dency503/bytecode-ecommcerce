import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/apiConfig';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarCategoria = () => {
    useDocumentTitle("Categorias | Admin Bytecode");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [show, setShow] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombreCategoria: '',
    url_imagen: '',
  }); const fetchData = () => {
    axios
      .get(`${apiUrl}/categorias`)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
        toast.error("Error al obtener categorías");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setCategoriaAEditar({ ...categoria });
    setShow(true);
  };

  const handleAbrirModalCrearCategoria = () => {
    setNuevaCategoria({
      nombreCategoria: '',
      url_imagen: '',
    });
    setShow(true);
  };

  const handleClose = () => {
    setCategoriaAEditar(null);
    setCategoriaSeleccionada(null);
    setShow(false);
  };

  const handleGuardarCambios = () => {
    api
      .put(`${apiUrl}/categorias/${categoriaAEditar.categoriaId}`, categoriaAEditar)
      .then((response) => {  
        handleClose();
        toast.success("Categoría actualizada exitosamente");
        fetchData();
      })
      .catch((error) => {
        console.error("Error al actualizar categoría:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Manejar error de permisos insuficientes
            toast.error("No tienes los permisos necesarios para actualizar esta categoría.");
          } else {
            // Manejar otros errores
            toast.error("Error al actualizar categoría");
          }
      });
  };
  const handleEliminarCategoria = (id) => {
    api
      .delete(`/categorias/${id}`)
      .then((response) => {
        console.log("Categoría eliminada exitosamente:", response.data);
        
        toast.success("Categoría eliminada exitosamente");
        fetchData();
      })
      .catch((error) => {
        console.error("Error al eliminar categoría:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Manejar error de permisos insuficientes
            toast.error("No tienes los permisos necesarios para eliminar esta categoría.");
          } else {
            // Manejar otros errores
            toast.error("Error al eliminar categoría");
          }
      });
  };
  const handleCrearCategoria = () => {
    api
      .post(`/categorias`, nuevaCategoria)
      .then((response) => {
       
        handleClose();
        toast.success("Categoría creada exitosamente");
        fetchData();
      })
      .catch((error) => {
        console.error("Error al crear categoría:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Manejar error de permisos insuficientes
            toast.error("No tienes los permisos necesarios para crear esta categoría.");
          } else {
            // Manejar otros errores
            toast.error("Error al crear categoría");
          }
      });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Categoría</th>
            <th>Nombre de la Categoría</th>
            <th>URL de la Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.categoriaId}>
              <td>{categoria.categoriaId}</td>
              <td>{categoria.nombreCategoria}</td>
              <td>
                <img src={categoria.url_imagen} style={{ maxWidth: "150px", maxHeight: "150px" }} alt="" />
              </td>
              <td>
                <Button onClick={() => handleEditarCategoria(categoria)}>Editar</Button>
                <Button variant="danger" onClick={() => handleEliminarCategoria(categoria.categoriaId)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={handleAbrirModalCrearCategoria}>Crear Nueva Categoría</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{categoriaAEditar ? 'Editar Categoría' : 'Crear Nueva Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoriaId">
              <Form.Label>ID de Categoría</Form.Label>
              <Form.Control type="text" value={categoriaAEditar?.categoriaId || ''} readOnly />
            </Form.Group>

            <Form.Group controlId="formNombreCategoria">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control
                type="text"
                value={categoriaAEditar?.nombreCategoria || nuevaCategoria.nombreCategoria}
                onChange={(e) =>
                  categoriaAEditar
                    ? setCategoriaAEditar({
                        ...categoriaAEditar,
                        nombreCategoria: e.target.value,
                      })
                    : setNuevaCategoria({
                        ...nuevaCategoria,
                        nombreCategoria: e.target.value,
                      })
                }
              />
            </Form.Group>

            <Form.Group controlId="formUrlImagen">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                value={categoriaAEditar?.url_imagen || nuevaCategoria.url_imagen}
                onChange={(e) =>
                  categoriaAEditar
                    ? setCategoriaAEditar({
                        ...categoriaAEditar,
                        url_imagen: e.target.value,
                      })
                    : setNuevaCategoria({
                        ...nuevaCategoria,
                        url_imagen: e.target.value,
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
          {categoriaAEditar ? (
            <Button variant="primary" onClick={handleGuardarCambios}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCrearCategoria}>
              Crear Categoría
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default GestionarCategoria;
