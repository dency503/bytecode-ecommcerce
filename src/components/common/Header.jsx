import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../../utils/apiConfig";
import { useUserCart } from "../../hooks/UserCartProvider";
import { Link } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const { name, cart, fetchData } = useUserCart();
  const [categorias, setCategorias] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const deleteFromCart = async (id) => {
    try {
      const response = await api.delete(`/carrito/item/${id}`);
      if (response.status === 200) {
        // La eliminación fue exitosa, realizar acciones adicionales si es necesario
        fetchData();
        console.log("Elemento eliminado del carrito con éxito.");
        // Realizar otras acciones después de la eliminación si es necesario
      } else {
        // La eliminación no fue exitosa, manejar el error si es necesario
        console.error("Error al eliminar el elemento del carrito.");
      }
    } catch (error) {
      // Error de red u otro error, manejar el error si es necesario
      console.error(
        "Error de red al intentar eliminar el elemento del carrito.",
        error
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData();
    } else {
      // Lógica para manejar la ausencia de token, si es necesario
      console.log("No hay token de usuario.");
    }

    // Hacer la solicitud GET usando Axios
    axios
      .get(`${apiUrl}/categorias`)
      .then((response) => {
        // La solicitud se completó con éxito, puedes manejar los datos de respuesta aquí
        setCategorias(response.data);
      })
      .catch((error) => {
        // La solicitud falló, maneja el error aquí
        console.error("Error al obtener categorías:", error);
      });
  }, []);

  return (
    <header>
      <div id="top-header">
        <Container>
          <ul className="header-links pull-left">
            <li>
              <a href="#">
                <i className="fa fa-phone"></i> +503 2123-4567
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o"></i> info@bytecode.com
              </a>
            </li>
          </ul>
          <ul className="header-links pull-right">
            <li>
              <a href="#">
                <i className="fa fa-dollar"></i> USD
              </a>
            </li>
            <li>
              {name ? (
                <a href="/cuenta">
                  <i className="fa fa-user-o"></i> {name}
                </a>
              ) : (
                <a href="/signin">
                  <i className="fa fa-user-o"></i> Iniciar Sesion
                </a>
              )}
            </li>
          </ul>
        </Container>
      </div>
      <div id="header">
        <Container>
          <div className="row">
            <div className="col-md-3">
              <div className="header-logo">
                <a href="/" className="logo">
                  <img src="/logo.png" alt="" />
                </a>
              </div>
            </div>

            <div className="col-md-6">
              <div className="header-search">
                <form>
                  <select className="input-select">
                    <option value="0">Categorias</option>
                    {categorias.map((categoria) => (
                      <option value={categoria.categoriaId}>
                        {categoria.nombreCategoria}
                      </option>
                    ))}
                  </select>
                  <input className="input" placeholder="Search here" />
                  <button className="search-btn">Buscar</button>
                </form>
              </div>
            </div>

            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                <div>
                  <a href="#">
                    <i className="fa fa-heart-o"></i>
                    <span>Tus favoritos</span>
                    <div className="qty">2</div>
                  </a>
                </div>

                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-shopping-cart"></i>
                    <span>Carrito</span>
                    {cart.items && (
                      <div className="qty"> {cart.items.length}</div>
                    )}
                  </a>
                  {cart.items && cart.items.length > 0 ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="cartDropdown"
                    >
                      <div className="cart-list">
                        {cart.items &&
                          cart.items.map((item) => (
                            <div key={item.itemId} className="product-widget">
                              <div className="product-img">
                                <img
                                  src={item.producto.imagenURl}
                                  alt={item.producto.nombreProducto}
                                />
                              </div>
                              <div className="product-body">
                                <h3 className="product-name">
                                  {item.producto.nombreProducto}
                                </h3>
                                <h4 className="product-price">
                                  <span className="qty">{item.cantidad}x</span>$
                                  {item.producto.precio.toFixed(2)}
                                </h4>
                              </div>
                              <button
                                className="delete"
                                onClick={() => deleteFromCart(item.itemId)}
                              >
                                <i className="fa fa-close"></i>
                              </button>
                            </div>
                          ))}
                      </div>
                      <div className="cart-summary">
                        <h5>
                          SUBTOTAL:$
                          {cart.items &&
                            cart.items
                              .reduce(
                                (total, item) =>
                                  total + item.cantidad * item.producto.precio,
                                0
                              )
                              .toFixed(2)}
                        </h5>
                      </div>
                      <div className="cart-btns">
                        <Link className="dropdown-item" to="/checkout">
                          Pagar <i className="fa fa-arrow-circle-right"></i>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="cartDropdown"
                    >
                      <p>Empieza agregar items </p>
                    </div>
                  )}
                </div>

                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
