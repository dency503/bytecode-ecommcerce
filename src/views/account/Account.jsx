import React, { useEffect, useState } from "react";
import api from "../../utils/apiConfig";

const UserProfile = () => {
  const [usuario, setUsuario] = useState({
    nombre: "Rodrigo Oliverio",
    apellido: "Fernández",
    direccion: "Calle Principal, 123",
    pais: "El Salvador",
    telefono: "+503 7063-6535",
  });
  const [direccionEnvio, setDireccionEnvio] = useState({
    calle: "Avenida Secundaria, 456",
    ciudad: "Ciudad de Envío",
    codigoPostal: "54321",
  });

  const [metodosPago] = useState([
    "Tarjeta de Crédito",
    "PayPal",
    "Transferencia Bancaria",
  ]);
  const [carrito] = useState([
    {
      id: 1,
      nombre: "Producto 1",
      precio: 50.0,
      cantidad: 2,
      image: "./img/product01.png",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 30.0,
      cantidad: 1,
      image: "./img/product02.png",
    },
  ]);
  const total = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
  const [client, setClient] = useState({});
  useEffect(() => {
    // Hacer una solicitud GET a la API para obtener el nombre
    api
      .get("/v1/auth/user")
      .then((response) => {
        // Establecer el nombre en el estado usando los datos de la respuesta
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [localStorage.getItem("token")]);
  return (
    <div className="container section mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="text-center">
            <img
              src="img/Login.webp"
              alt="Usuario"
              className="img-fluid rounded-circle"
            />
            <button
              id="btn-contact"
              className="btn btn-primary btn-block mt-3"
              data-toggle="modal"
              data-target="#contactModal"
            >
              Editar Perfil
            </button>
            <div className="border my-3"></div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Información Personal</h4>
                  <p className="card-text">
                    <strong>Nombre:</strong> {client.nombreCliente}
                  </p>
                  <p className="card-text">
                    <strong>Apellido:</strong> {client.apellidoCliente}
                  </p>

                  <p className="card-text">
                    <strong>País:</strong>{" "}
                    {client.direccion && client.direccion.pais}
                  </p>
                  <p className="card-text">
                    <strong>Teléfono:</strong> {client.telefono}
                  </p>
                </div>
              </div>
              <hr />
              {client.direccion && <div className="card mt-3">
                <div className="card-body">
                  <h4 className="card-title">Dirección de Envío</h4>
                  <p className="card-text">
                    <strong>Linea 1:</strong>{" "}
                    { client.direccion.linea1}
                  </p>

                  <p className="card-text">
                    <strong>Distrito:</strong>{" "}
                    {client.direccion.distrito.distrito}
                  </p>
                  <p className="card-text">
                    <strong>Municipio:</strong>{" "}
                    {  client.direccion.distrito.municipio.municipio}
                  </p>

                  <p className="card-text">
                    <strong>Departamento:</strong>{" "}
                    {
                       client.direccion.distrito.municipio.departamento
                        .departamento
                    }
                  </p>
                  <p className="card-text">
                    <strong>Código Postal:</strong>{" "}
                    { client.direccion.codigoPostal}
                  </p>
                </div>
              </div>}

              <hr />
              
            </div>
            <div className="col-md-4">
              <h3>
                <strong>Carrito de Compras</strong>
              </h3>
              {carrito.map((producto) => (
                <div key={producto.id} className="cart-item text-center">
                  <img src={producto.image} alt={`Producto ${producto.id}`} />
                  <h3>{producto.nombre}</h3>
                  <p>Precio: ${producto.precio.toFixed(2)}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p>
                    Subtotal: $
                    {(producto.precio * producto.cantidad).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
              </div>
              <a
                href="/electro-master/store.html"
                className="btn btn-primary btn-block"
              >
                Seguir buscando
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
