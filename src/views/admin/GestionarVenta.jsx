import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/apiConfig";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ventaAEditar, setVentaAEditar] = useState(null);
  const [nuevaVenta, setNuevaVenta] = useState({
    carritoCompras: { carritoId: "" },
    pago: { pagoId: "" },
    fechaVenta: "",
    total: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ventas`);
      setVentas(response.data.content);
    } catch (error) {
      console.error("Error fetching ventas:", error);
      toast.error("Error al obtener ventas");
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setModoEdicion(false);
    setVentaAEditar(null);
    setNuevaVenta({
      carritoCompras: { carritoId: "" },
      pago: { pagoId: "" },
      fechaVenta: "",
      total: "",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModoEdicion(false);
    setVentaAEditar(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaVenta((prevVenta) => ({
      ...prevVenta,
      [name]: value,
    }));
  };

  const handleGuardarVenta = async () => {
    try {
      if (modoEdicion && ventaAEditar) {
        // Update existing venta
        await api.put(`/ventas/${ventaAEditar.ventaId}`, ventaAEditar);
 
        toast.success("Venta actualizada exitosamente");
      } else {
        // Create new venta
        const response = await api.post(`/ventas`, nuevaVenta);
       
        toast.success("Venta actualizada exitosamente");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error creating/updating venta:", error);
      toast.error("Error al guardar venta");
    }
  };

  const handleEditarVenta = (venta) => {
    setVentaAEditar(venta);
    setNuevaVenta({ ...venta });
    setModoEdicion(true);
    setShowModal(true);
  };

  const handleEliminarVenta = async (ventaId) => {
    try {
      await axios.delete(`${apiUrl}/ventas/${ventaId}`);
      setVentas((prevVentas) =>
        prevVentas.filter((venta) => venta.ventaId !== ventaId)
      );
      toast.success("Venta eliminada exitosamente");
    } catch (error) {
      console.error(`Error deleting venta ${ventaId}:`, error);
      toast.error("Error al eliminar venta");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Ventas</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Nueva Venta
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Carrito ID</th>
            <th>Pago ID</th>
            <th>Fecha de Venta</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.ventaId}>
              <td>{venta.ventaId}</td>
              <td>{venta.carritoCompras.carritoId}</td>
              <td>{venta.pago.pagoId}</td>
              <td>{venta.fechaVenta}</td>
              <td>{venta.total}</td>
              <td>
                <Button variant="info" onClick={() => handleEditarVenta(venta)}>
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleEliminarVenta(venta.ventaId)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar" : "Nueva"} Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCarritoId">
              <Form.Label>Carrito ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Carrito ID"
                name="carritoCompras.carritoId"
                value={
                  modoEdicion
                    ? ventaAEditar?.carritoCompras.carritoId
                    : nuevaVenta.carritoCompras.carritoId
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (modoEdicion) {
                    setVentaAEditar((prevVenta) => ({
                      ...prevVenta,
                      carritoCompras: {
                        carritoId: value,
                      },
                    }));
                  } else {
                    setNuevaVenta((prevVenta) => ({
                      ...prevVenta,
                      carritoCompras: {
                        carritoId: value,
                      },
                    }));
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPagoId">
              <Form.Label>Pago ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pago ID"
                name="pago.pagoId"
                value={
                  modoEdicion
                    ? ventaAEditar?.pago.pagoId
                    : nuevaVenta.pago.pagoId
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (modoEdicion) {
                    setVentaAEditar((prevVenta) => ({
                      ...prevVenta,
                      pago: {
                        pagoId: value,
                      },
                    }));
                  } else {
                    setNuevaVenta((prevVenta) => ({
                      ...prevVenta,
                      pago: {
                        pagoId: value,
                      },
                    }));
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formFechaVenta">
              <Form.Label>Fecha de Venta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Fecha de Venta"
                name="fechaVenta"
                value={
                  modoEdicion ? ventaAEditar?.fechaVenta : nuevaVenta.fechaVenta
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (modoEdicion) {
                    setVentaAEditar((prevVenta) => ({
                      ...prevVenta,
                      fechaVenta: value,
                    }));
                  } else {
                    setNuevaVenta((prevVenta) => ({
                      ...prevVenta,
                      fechaVenta: value,
                    }));
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Total"
                name="total"
                value={modoEdicion ? ventaAEditar?.total : nuevaVenta.total}
                onChange={(e) => {
                  const value = e.target.value;
                  if (modoEdicion) {
                    setVentaAEditar((prevVenta) => ({
                      ...prevVenta,
                      total: value,
                    }));
                    
                  } else {
                    setNuevaVenta((prevVenta) => ({
                      ...prevVenta,
                      total: value,
                    }));
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarVenta}>
            {modoEdicion ? "Guardar Cambios" : "Guardar Venta"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default GestionarVenta;
