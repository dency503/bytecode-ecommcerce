import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GestionarVenta = () => {
  useDocumentTitle("Inicio | Admin Bytecode");
  
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ventaAEditar, setVentaAEditar] = useState(null);
  const [nuevaVenta, setNuevaVenta] = useState({
    fechaVenta: "",
    total: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ventas/all`);
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
            <th>Fecha de Venta</th>
            <th>Total</th>
            {/* Added table headers for new attributes */}
            <th>Método de Pago</th>
            <th>Estado de Pago</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.ventaId}>
              <td>{venta.ventaId}</td>
              <td>{venta.fechaVenta}</td>
              <td>{venta.total}</td>
              {/* Added table data for new attributes */}
              <td>{venta.metodoPago?.nombre}</td>
              <td>{venta.estadoPago}</td>
              <td>{venta.cliente?.nombreCliente}</td>
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
      <Form.Group controlId="formEstadoPago">
        <Form.Label>Estado de Pago</Form.Label>
        <Form.Control
          as="input"
          name="estadoPago"
          value={modoEdicion ? ventaAEditar?.estadoPago : nuevaVenta.estadoPago}
          onChange={(e) => {
            const value = e.target.value;
            if (modoEdicion) {
              setVentaAEditar((prevVenta) => ({
                ...prevVenta,
                estadoPago: value,
              }));
            } else {
              setNuevaVenta((prevVenta) => ({
                ...prevVenta,
                estadoPago: value,
              }));
            }
          }}
        >
          {/* Add options based on available payment states */}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formCliente">
        <Form.Label>Cliente</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Cliente"
          name="cliente"
          value={modoEdicion ? ventaAEditar?.cliente : nuevaVenta.cliente}
          onChange={(e) => {
            const value = e.target.value;
            if (modoEdicion) {
              setVentaAEditar((prevVenta) => ({
                ...prevVenta,
                cliente: value,
              }));
            } else {
              setNuevaVenta((prevVenta) => ({
                ...prevVenta,
                cliente: value,
              }));
            }
          }}
        />
      </Form.Group>
      {/* Additional attributes */}
      <Form.Group controlId="formMetodoPago">
        <Form.Label>Método de Pago</Form.Label>
        {/* Assuming 'metodoPago' is a dropdown/select field */}
        <Form.Control
          as="input"
          name="metodoPago"
          value={modoEdicion ? ventaAEditar?.metodoPago?.metodoPagoId : nuevaVenta?.metodoPago?.metodoPagoID}
          onChange={(e) => {
            const value = e.target.value;
            if (modoEdicion) {
              setVentaAEditar((prevVenta) => ({
                ...prevVenta,
                metodoPago: value,
              }));
            } else {
              setNuevaVenta((prevVenta) => ({
                ...prevVenta,
                metodoPago: value,
              }));
            }
          }}
        >
          {/* Add options based on available payment methods */}
        </Form.Control>
      </Form.Group>

      {/* Repeat similar blocks for 'estadoPago', 'cliente', and 'detallesVenta' */}

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
