import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Tab } from "react-bootstrap";
import { useEffect } from "react";
import api from "../../utils/apiConfig";
const ITEMS_PER_PAGE = 2;
const HistorialComprasTab = ({}) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber - 1);
  const formatFecha = (fecha) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(fecha).toLocaleDateString("es-ES", options);
  };
  const [ventas, setHistorialVentas] = useState([]);
  useEffect(() => {
    const obtenerHistorialVentas = async () => {
      try {
        // Realizar la solicitud para obtener el historial de ventas
        const response = await api.get(`/ventas`, {
          params: { page: currentPage, size: ITEMS_PER_PAGE },
        });

        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
          setHistorialVentas(response.data);
        } else {
          console.error(
            "Error al obtener el historial de ventas:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Llamar a la función para obtener el historial de ventas
    obtenerHistorialVentas();
  }, [api, currentPage]);
  const renderDetalleVenta = (detalle) => (
    <li
      key={detalle.detalleVentaId}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className="text-success mr-2" />
        <strong>Producto:</strong> {detalle.producto.nombreProducto},
        <strong>Cantidad:</strong> {detalle.cantidad},
        <strong>Precio Unitario:</strong> ${detalle.precioUnitario}
      </div>
      <span className="badge bg-dark">
        <strong>Total por Producto:</strong> $
        {detalle.cantidad * detalle.precioUnitario}
      </span>
    </li>
  );
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  console.log(ventas.content);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-3">
      {ventas.content?.map((detalleVenta) => (
        <div key={detalleVenta.ventaId} className="row mb-4">
          <div className="col-md-6">
            <h2>Compra</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>ID de Venta:</strong> {detalleVenta.ventaId}
              </li>
              <li className="list-group-item">
                <strong>Fecha de Venta:</strong>{" "}
                {formatFecha(detalleVenta.fechaVenta)}
              </li>
              <li className="list-group-item">
                <strong>Total:</strong> ${detalleVenta.total}
              </li>
              <li className="list-group-item">
                <strong>Estado de Pago:</strong>{" "}
                <span className={detalleVenta.estadoPago}>
                  {detalleVenta.estadoPago}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Método de Pago:</strong>{" "}
                {detalleVenta.metodoPago?.nombre}
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3 className="mb-3">Detalles de la compra</h3>
            <ul className="list-group">
              {detalleVenta.detallesVenta &&
                detalleVenta.detallesVenta.map(renderDetalleVenta)}
            </ul>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center">
        <Pagination>
          {[...Array(ventas.totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default HistorialComprasTab;
