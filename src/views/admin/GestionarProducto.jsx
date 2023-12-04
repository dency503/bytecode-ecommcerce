import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarProducto = () => {    useDocumentTitle("Productos | Admin Bytecode")
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    
    nombreProducto: "",
    imagenURl: "",
    descripcionProducto: "",
    precio: 0,
    stock: 0,
    marca: null,
    categoria: null, // Puedes ajustar esto según tu modelo de datos
  });

  const handleShowModal = (producto) => {
    setProductoAEditar(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductoAEditar(null);
  };
  const fetchData = async () => {
    try {
      const responseProductos = await axios.get(`${apiUrl}/productos`);
      setProductos(responseProductos.data);

      const responseCategorias = await axios.get(`${apiUrl}/categorias`);
      setCategorias(responseCategorias.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const handleAgregarProducto = async () => {
    try {
      const response = await api.post(`/productos`, nuevoProducto);
      setProductos([...productos, response.data]);
      handleCloseModal();
      fetchData();
      toast.success("Producto agregado correctamente.");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Mostrar un toast de error específico para el error 403
        toast.error(
          "No tienes suficientes permisos para realizar esta acción."
        );
      } else {
        // Mostrar un toast genérico para otros errores
        toast.error("Error al agregar el producto. Inténtalo de nuevo.");
      }
      handleCloseModal();
    }
  };

  const handleActualizarProducto = async () => {
    try {
        console.log("Datos a enviar:", productoAEditar);
      const response = await api.put(
        `/productos/${productoAEditar.productoId}`,
        productoAEditar
      );
     
      
      handleCloseModal();
      fetchData();
      toast.success("Producto actualizado correctamente.");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Mostrar un toast de error específico para el error 403
        toast.error(
          "No tienes suficientes permisos para realizar esta acción."
        );
      } else {
        // Mostrar un toast genérico para otros errores
        toast.error("Error al actualizar el producto. Inténtalo de nuevo.");
      }
      handleCloseModal();
    }
  };

  const handleEliminarProducto = async () => {
    try {
      await api.delete(`/productos/${productoAEditar.productoId}`);
    
      handleCloseModal();
      fetchData();
      toast.success("Producto eliminado correctamente.");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Mostrar un toast de error específico para el error 403
        toast.error(
          "No tienes suficientes permisos para realizar esta acción."
        );
      } else {
        // Mostrar un toast genérico para otros errores
        toast.error("Error al eliminar el producto. Inténtalo de nuevo.");
      }
      handleCloseModal();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <>
       
        <Col md={10} className="ml-sm-auto">
          <h1>Gestión de Productos</h1>
          <ToastContainer />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.productoId}>
                  <td>{producto.productoId}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>
                    <img
                      src={producto.imagenURl}
                      alt={producto.nombreProducto}
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                  </td>
                  <td>{producto.descripcionProducto}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.marca || "Sin marca"}</td>
                  <td>
                    {producto.categoria
                      ? producto.categoria.nombreCategoria
                      : "Sin categoría"}
                  </td>
                  {/* Agregar más columnas según sea necesario */}
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        handleShowModal(producto);
                      }}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleShowModal();
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={() => handleShowModal()}>
            Agregar Nuevo Producto
          </Button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {productoAEditar ? "Editar Producto" : "Agregar Producto"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductoId">
                  <Form.Label>ID de Producto</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.productoId
                        : nuevoProducto.productoId
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formNombreProducto">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar ? productoAEditar.nombreProducto : nuevoProducto.nombreProducto
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          nombreProducto: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          nombreProducto: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formImagenURl">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.imagenURl
                        : nuevoProducto.imagenURl
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          imagenURl: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          imagenURl: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formDescripcionProducto">
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.descripcionProducto
                        : nuevoProducto.descripcionProducto
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          descripcionProducto: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          descripcionProducto: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.precio
                        : nuevoProducto.precio
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          precio: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          precio: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.stock
                        : nuevoProducto.stock
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          stock: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          stock: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formMarca">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      productoAEditar
                        ? productoAEditar.marca
                        : nuevoProducto.marca
                    }
                    onChange={(e) => {
                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          marca: e.target.value,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          marca: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formCategoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    value={
                      productoAEditar
                        ? productoAEditar.categoria?.categoriaId
                        : nuevoProducto.categoria?.categoriaId
                    }
                    onChange={(e) => {
                      const categoriaId = e.target.value;
                      const selectedCategoria = categorias.find(
                        (categoria) =>
                          categoria.categoriaId === parseInt(categoriaId)
                      );

                      if (productoAEditar) {
                        setProductoAEditar({
                          ...productoAEditar,
                          categoria: selectedCategoria,
                        });
                      } else {
                        setNuevoProducto({
                          ...nuevoProducto,
                          categoria: selectedCategoria,
                        });
                      }
                    }}
                  >
                    <option value={0}>Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.categoriaId}
                        value={categoria.categoriaId}
                      >
                        {categoria.nombreCategoria}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
              {productoAEditar ? (
                <Button variant="info" onClick={handleActualizarProducto}>
                  Actualizar
                </Button>
              ) : (
                <Button variant="success" onClick={handleAgregarProducto}>
                  Agregar
                </Button>
              )}
              {productoAEditar && (
                <Button variant="danger" onClick={handleEliminarProducto}>
                  Eliminar
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Col>
      </>
    </>
  );
};

export default GestionarProducto;
