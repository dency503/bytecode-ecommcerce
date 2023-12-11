import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/apiConfig";
import { useUserCart } from "../../hooks/UserCartProvider";
import { useDocumentTitle, useBasket } from "@/hooks";
import PaymentComponent from "../PaymentComponent";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addQtyItem, minusQtyItem } from "@/redux/actions/basketActions";
const ViewProduct = () => {
  const { id } = useParams();
  const { addToBasket, isItemOnBasket } = useBasket(id);
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchData } = useUserCart();

  const [nuevaCantidad, setNuevaCantidad] = useState(null);
  const [itemId, setItemId] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  useDocumentTitle(`${producto?.nombreProducto || ""} | Bytecode`);
  const product = useSelector((state) => {
    const foundProduct = state.basket.find(
      (product) => product.productoId == id
    );

    return foundProduct || null; // Devuelve null si el producto no se encuentra
  });
  const handleAddToBasket = () => {
    addToBasket({ ...producto, quantity: 1 });
  };

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
  const dispatch = useDispatch();
  const addToCart = async () => {
    addToBasket({ ...producto, quantity: 1 });
   
  };

  const handleDecrease = () => {
    if (product.stock >= product.quantity && product.quantity !== 0) {
      dispatch(minusQtyItem(product.productoId));
    }
  };

  const handleIncrease = () => {
    if (product.quantity < product.stock) {
      dispatch(addQtyItem(product.productoId));
    }
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

          {product ? (
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
                    value={product.quantity}
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
