import React, { useState,useEffect } from "react";
import { useUserCart } from "../../hooks/UserCartProvider";
import api from "../../utils/apiConfig";

const CheckOut = () => {
  const { cart } = useUserCart();
  const [differentShippingAddress, setDifferentShippingAddress] =
    useState(false);
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
    <div>
      <div id="breadcrumb" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="breadcrumb-header">Checkout</h3>
              <ul className="breadcrumb-tree">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">Dirección de facturación</h3>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    value={client.nombreCliente}
                    name="firstName"
                
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="lastName"
                  
                    value={client.apellidoCliente}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={client.email}
                    placeholder="Correo Electrónico"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="address"
                    value={client.direccion && client.direccion.linea1}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="city"
                    value={
                        client.direccion && client.direccion.distrito.municipio.departamento
                          .departamento
                      }
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="country"
                    value={client.direccion && client.direccion.pais}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="text"
                    name="zipCode"
                    value={client.direccion && client.direccion.codigoPostal}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    type="tel"
                    name="tel"
                    value={client.telefono}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <div className="input-checkbox">
                    <input type="checkbox" id="create-account" />
                    <label htmlFor="create-account">
                      <span></span>
                      ¿Crear cuenta?
                    </label>
                    {differentShippingAddress && (
                      <div className="caption">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt.
                        </p>
                        <input
                          className="input"
                          type="password"
                          name="password"
                          placeholder="Ingresa tu Contraseña"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="shiping-details">
                <div className="section-title">
                  <h3 className="title">Dirección de envío</h3>
                </div>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    id="shiping-address"
                    checked={differentShippingAddress}
                    onChange={() =>
                      setDifferentShippingAddress(!differentShippingAddress)
                    }
                  />
                  <label htmlFor="shiping-address">
                    <span></span>
                    ¿Enviar a una dirección diferente?
                  </label>
                  {differentShippingAddress && (
                    <div className="caption">
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingFirstName"
                          placeholder="Nombre"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingLastName"
                          placeholder="Apellido"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="email"
                          name="shippingEmail"
                          placeholder="Correo Electrónico"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingAddress"
                          placeholder="Dirección"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingCity"
                          placeholder="Ciudad"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingCountry"
                          placeholder="País"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="text"
                          name="shippingZipCode"
                          placeholder="Código Postal"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="input"
                          type="tel"
                          name="shippingTel"
                          placeholder="Teléfono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="order-notes">
                <textarea
                  className="input"
                  placeholder="Order Notes"
                ></textarea>
              </div>
            </div>

            <div className="col-md-5 order-details">
              <div className="section-title text-center">
                <h3 className="title">Tu Orden</h3>
              </div>
              <div className="order-summary">
                {/* Detalles del pedido */}
                {cart.items &&
                  cart.items.map((item, index) => (
                    <div className="order-col" key={index}>
                      <div>
                        {item.cantidad}x {item.producto.nombreProducto}
                      </div>
                      <div>${item.producto.precio.toFixed(2)}</div>
                    </div>
                  ))}

<div className="order-col">
  <div className="col-6">Envío</div>
  <div className="col-6 text-right">
    <strong>
      Gratis
    </strong>
  </div>
</div>

                <div className="order-col">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong className="order-total">
                      $
                      {cart.items &&
                            cart.items
                              .reduce(
                                (total, item) =>
                                  total + item.cantidad * item.producto.precio,
                                0
                              )
                              .toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
              {/* Métodos de pago */}
              <div className="payment-method">
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-1" />
                  <label htmlFor="payment-1">
                    <span></span>
                    Transferencia Bancaria Directa
                  </label>
                  <div className="caption">
                    <p>
                      Selecciona esta opción si deseas realizar una
                      transferencia bancaria directa para pagar tu pedido.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-2" />
                  <label htmlFor="payment-2">
                    <span></span>
                    Pago con Cheque
                  </label>
                  <div className="caption">
                    <p>
                      Elige esta opción si deseas pagar tu pedido mediante un
                      cheque. Asegúrate de que el cheque esté a nombre de
                      nuestra empresa.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-3" />
                  <label htmlFor="payment-3">
                    <span></span>
                    Sistema Paypal
                  </label>
                  <div className="caption">
                    <p>
                      Utiliza esta opción si prefieres realizar el pago a través
                      del sistema Paypal. Serás redirigido a la plataforma de
                      Paypal para completar la transacción.
                    </p>
                  </div>
                </div>
              </div>
              {/* /Métodos de pago */}

              <div className="input-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  <span></span>
                  He leído y acepto los <a href="#">términos y condiciones</a>
                </label>
              </div>
              <a href="#" className="primary-btn order-submit">
                Realizar Pedido
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
