import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/apiConfig";
import { useUserCart } from "../../hooks/UserCartProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ViewProduct = () => {
  
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  useDocumentTitle(`${producto && producto.nombreProducto} | Bytecode`)
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchData } = useUserCart();
  const [nuevaCantidad, setNuevaCantidad] = useState(null); // Establece un valor predeterminado para la cantidad
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    // Obtener detalles del producto al cargar el componente
    axios
      .get(`http://localhost:8080/api/productos/${id}`)
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener detalles del producto:", error);
        setError("No se pudo cargar el producto.");
      });
  }, [id]);
  useEffect(() => {
    // Obtener detalles del producto al cargar el componente
    if (nuevaCantidad >= 1) {
      modifyToCart();
    }
  }, [nuevaCantidad]);
  const handleDecrease = () => {
    if (nuevaCantidad > 1) {
      setNuevaCantidad(nuevaCantidad - 1);
      // Llama a modifyToCart cuando la cantidad se disminuye
    }
  };

  const handleIncrease = () => {
    setNuevaCantidad(nuevaCantidad + 1);
  };
  useEffect(() => {
    // Obtener detalles del producto en el carrito si existe
    const fetchCartItem = async () => {
      try {
        const response = await api.get(`/carrito/item/producto/${id}`);
        setNuevaCantidad(response.data.cantidad);
        setItemId(response.data.itemId);
      } catch (error) {
        console.error(
          "Error al obtener detalles del producto en el carrito:",
          error
        );
      }
    };

    fetchCartItem();
  }, [id]);

  const addToCart = () => {
    // Agregar producto al carrito
    api
      .post(`/carrito/${id}`)
      .then((response) => {
        //setNuevaCantidad(response.data.cantidad)
        setNuevaCantidad(1);
        fetchData();
      })
      .catch((error) => {
        console.error("Error al agregar el producto al carrito:", error);
      });
  };

  const modifyToCart = () => {
    // Modificar la cantidad del producto en el carrito
    api
      .put(`/carrito/item/${itemId}?nuevaCantidad=${nuevaCantidad}`)
      .then(() => fetchData()) // Llama a fetchData después de la solicitud PUT sea exitosa
      .catch((error) => {
        console.error("Error al modificar el carrito:", error);
      });
  };

  const handleInputChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
      setNuevaCantidad(nuevaCantidad);
    }
  };

  const deleteFromCart = async () => {
    // Eliminar producto del carrito
    if (itemId) {
      try {
        const response = await api.delete(`/carrito/item/${itemId}`);
        if (response.status === 200) {
          fetchData();
          console.log("Elemento eliminado del carrito con éxito.");
          setNuevaCantidad(0);
          setItemId(null);
        } else {
          console.error("Error al eliminar el elemento del carrito.");
        }
      } catch (error) {
        console.error(
          "Error de red al intentar eliminar el elemento del carrito.",
          error
        );
      }
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  if (!producto) {
    return <div className="container mt-5">Cargando...</div>;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagenURl}
            alt={producto.nombreProducto}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{producto.nombreProducto}</h1>
          <p className="lead">Precio: ${producto.precio}</p>
          <p>
            <strong>Descripción:</strong> {producto.descripcionProducto}
          </p>
          <p>
            <strong>Características:</strong> {producto.caracteristicas}
          </p>
          <p>
            <strong>Disponibilidad:</strong>{" "}
            {producto.disponibilidad ? "En stock" : "Agotado"}
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria.nombreCategoria}
          </p>

          {nuevaCantidad ? (
            <div className="d-flex align-items-center mt-3">
              {nuevaCantidad >= 2 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleDecrease()}
                >
                  <i className="fa fa-minus"></i>
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFromCart(itemId)}
                >
                  <i className="fa fa-trash"></i> 
                </button>
              )}
              <input
                type="number"
                className="form-control mx-2"
                value={nuevaCantidad}
                onChange={handleInputChange}
                min="1"
                style={{ maxWidth: "70px" }}
              />
              <button className="btn btn-primary" onClick={handleIncrease}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={() => addToCart()}
            >
              Agregar al Carrito
            </button>
          )}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/")}
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
