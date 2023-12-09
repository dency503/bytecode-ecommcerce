import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/apiConfig";
import { useUserCart } from "../../hooks/UserCartProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PaymentComponent from "../PaymentComponent";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchData } = useUserCart();
  const [cantidad, setCantidad] = useState(null);
  const [nuevaCantidad, setNuevaCantidad] = useState(null);
  const [itemId, setItemId] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  useDocumentTitle(`${producto?.nombreProducto || ""} | Bytecode`);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        toast.error("Error al obtener detalles del producto:", error);
        setError("No se pudo cargar el producto.");
      }
    };
   
    fetchProductDetails();
  }, [id]);
  useEffect(() => {
    
    nuevaCantidad !=null?modifyToCart():"";
  }, [id,nuevaCantidad]);
  useEffect(() => {
    
    const fetchCartItem = async () => {
      try {
        const response = await api.get(`/carrito/item/${id}`);
        setNuevaCantidad(response.data.cantidad);
        setItemId(response.data.itemId);
      } catch (error) {
        
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      fetchCartItem();
    } else {
      // Lógica para manejar la ausencia de token, si es necesario
     
    }
    
  }, [id]);
  const modifyToCart = async () => {
    try {
      await api.put(`/carrito/${id}/${nuevaCantidad}`);
      fetchData();
      toast.success("has cambiado la cantidad");
    } catch (error) {
      toast.error("Error al modificar el carrito:", error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await api.post(`/carrito/${id}/1`);
      setNuevaCantidad(1);
      fetchData();
      toast.success("Producto agregado");
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const handleDecrease = () => {
    if (nuevaCantidad > 1) {
      setNuevaCantidad(nuevaCantidad - 1);
    }
  };

  const handleIncrease = () => {
    setNuevaCantidad(nuevaCantidad + 1);
  };

  const handleInputChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
      setNuevaCantidad(nuevaCantidad);
    }
    if (nuevaCantidad !== null) {
      modifyToCart();
    }
  };

  const deleteFromCart = async () => {
    if (itemId) {
      try {
        const response = await api.delete(`/carrito/item/${itemId}`);
        if (response.status === 200) {
          fetchData();
          toast.log("Elemento eliminado del carrito con éxito.");
          setNuevaCantidad(0);
          setItemId(null);
        } else {
          toast.error("Error al eliminar el elemento del carrito.");
        }
      } catch (error) {
        toast.error(
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

  const isProductInCart = nuevaCantidad > 0;
  const isProductSoldOut = !producto.stock;

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
            {producto.stock ? "En stock" : "Agotado"}
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria.nombreCategoria}
          </p>

          {isProductInCart ? (
            <div className="d-flex align-items-center mt-3">
              {isProductSoldOut ? (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteFromCart(itemId)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handleDecrease}>
                    <i className="fa fa-minus"></i>
                  </button>
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
                </>
              )}
            </div>
          ) : (
            <ActionButton
              onClick={addToCart}
              text="Agregar al Carrito"
              btnClass={`btn-primary mt-3 ${
                isProductSoldOut ? "disabled" : ""
              }`}
              disabled={isProductSoldOut}
            />
          )}

          <ActionButton
            onClick={() => navigate("/")}
            text="Volver a la Tienda"
            btnClass="btn-secondary mt-3"
          />
          <PaymentComponent />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({
  onClick,
  iconClass,
  text,
  btnClass = "btn-primary",
  disabled = false,
}) => (
  <button
    className={`btn ${btnClass} mt-3`}
    onClick={onClick}
    disabled={disabled}
  >
    {iconClass && <i className={iconClass}></i>}
    {text && <span className="ml-2">{text}</span>}
  </button>
);

export default ViewProduct;
