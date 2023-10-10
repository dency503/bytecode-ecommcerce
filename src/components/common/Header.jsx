import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
} from "react-bootstrap";
import api from "../../utils/apiConfig";

const Header = () => {
  const cartItems = [
    {
      id: 1,
      name: "Laptop",
      price: 980.0,
      quantity: 1,
      image: `/img/product01.png`,
    },
    {
      id: 2,
      name: "Audífonos",
      price: 140.0,
      quantity: 3,
      image: `/img/product02.png`,
    },
  ];

  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);

  const deleteFromCart = async (id) => {
    try {
      const response = await api.delete(`/carrito/item/${id}`);
      if (response.status === 200) {
        // La eliminación fue exitosa, realizar acciones adicionales si es necesario
        console.log('Elemento eliminado del carrito con éxito.');
        // Realizar otras acciones después de la eliminación si es necesario
      } else {
        // La eliminación no fue exitosa, manejar el error si es necesario
        console.error('Error al eliminar el elemento del carrito.');
      }
    } catch (error) {
      // Error de red u otro error, manejar el error si es necesario
      console.error('Error de red al intentar eliminar el elemento del carrito.', error);
    }
  };
  useEffect(() => {
    // Hacer una solicitud GET a la API para obtener el nombre
    api.get("/v1/auth/username")
      .then((response) => {
        // Establecer el nombre en el estado usando los datos de la respuesta
        setName(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
    api.get("/carrito")
      .then((response) => {
        // Establecer el nombre en el estado usando los datos de la respuesta
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener carrito:", error);
      });

  }, [localStorage.getItem('token')]);

  return (
    <header>{console.log(cart)}
      <div id="top-header">
        <Container>
          <ul className="header-links pull-left">
            <li>
              <a href="#">
                <i className="fa fa-phone"></i> +503 7063-6535
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o"></i> rodrigozavaleta12@gmail.com
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
              {name ? <a href="/cuenta">
                <i className="fa fa-user-o"></i> {name}
              </a> : <a href="/signin">
                <i className="fa fa-user-o"></i> Iniciar Sesion
              </a>}

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
                    <option value="1">Categoria 01</option>
                    <option value="1">Categoria 02</option>
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
                    <div className="qty">{cart.items && cart.items.length}</div>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="cartDropdown">
                    <div className="cart-list">
                      {cart.items && cart.items.map(item => (
                        <div key={item.itemId} className="product-widget">
                          <div className="product-img">
                            <img src={item.producto.imagenURl} alt={item.producto.nombreProducto} />
                          </div>
                          <div className="product-body">
                            <h3 className="product-name">{item.producto.nombreProducto}</h3>
                            <h4 className="product-price">
                              <span className="qty">{item.cantidad}x</span>${item.producto.precio.toFixed(2)}
                            </h4>
                          </div>
                          <button className="delete" onClick={() => deleteFromCart(item.itemId)}>
                            <i className="fa fa-close"></i>
                          </button>
                        </div>
                      ))}

                    </div>
                    <div className="cart-summary">
                      <h5>SUBTOTAL: $1,120.00</h5>
                    </div>
                    <div className="cart-btns">
                      <a className="dropdown-item" href="#">
                        Ver carrito
                      </a>
                      <a
                        className="dropdown-item"
                        href="/electro-master/checkout.html"
                      >
                        Pagar <i className="fa fa-arrow-circle-right"></i>
                      </a>
                    </div>
                  </div>
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
