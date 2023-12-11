import React, { useState, useEffect } from "react";
import { useUserCart } from "../../hooks/UserCartProvider";
import api from "../../utils/apiConfig";
import "react-toastify/dist/ReactToastify.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useSelector } from "react-redux";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { clearBasket } from "@/redux/actions/basketActions";
const CheckOut = () => {
  const navigate = useNavigate();
  useDocumentTitle("CheckOut | ByteCode");

  const client = useSelector((state) => state.profile);
  const stripe = useStripe();
  const elements = useElements();

  const cart = useSelector((state) => {
    const foundProduct = state.basket;

    return foundProduct || null; // Devuelve null si el producto no se encuentra
  });

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);

      // Handle the token (e.g., send it to your server for payment processing)

      const orderDescription = cart
        ? cart
            .map(
              (item, index) =>
                `(${item.quantity}x) ${
                  item.nombreProducto
                } - $${item.precio.toFixed(2)}`
            )
            .join("\n")
        : "";
      // Example with createPaymentMethod:
      const { data } = await axios.post(`${apiUrl}/payment/create`, {
        paymentMethodId: token.id,

        description: orderDescription,
        amount:
          cart &&
          cart
            .reduce((total, item) => total + item.quantity * item.precio, 0)
            .toFixed(2) * 100, // Set the amount in cents (e.g., 1000 for $10.00)
        currency: "usd",
      });

      // Once you have the clientSecret, you can use it to confirm the payment
      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: client.nombreCliente + " " + client.apellidoCliente,
            email: client.email,
            phone: client.telefono,
            address: {
              city: client.direccion.distrito.distrito,
              country: "SV",
              line1: client.direccion.line1,

              postal_code: client.direccion.codigoPostal,
              state:
                client.direccion.distrito.municipio.departamento.departamento,
            },
          },
        },
      });
      await axios.post(`${apiUrl}/payment/sucesss`, {
        paymentIntentId: result.paymentIntent.id,
        carritoId: cart.carritoId,
      });
      onClearBasket()
      toast.success("Pago Realizado", {
        onClose: () => {
          // Después de cerrar el toast, redirigir
          navigate("/");
        },
      });
     
    } catch (error) {
      // Handle errors during token creation or API requests
      console.error(error);
    }
  };

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
                      client.direccion &&
                      client.direccion.distrito.municipio.departamento
                        .departamento
                    }
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    codigoPostal
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
                {cart &&
                  cart.map((item, index) => (
                    <div className="order-col" key={index}>
                      <div>
                        {item.quantity}x {item.nombreProducto}
                      </div>
                      <div>${item.precio.toFixed(2)}</div>
                    </div>
                  ))}

                <div className="order-col">
                  <div className="col-6">Envío</div>
                  <div className="col-6 text-right">
                    <strong>Gratis</strong>
                  </div>
                </div>

                <div className="order-col">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong className="order-total">
                      $
                      {cart &&
                        cart
                          .reduce(
                            (total, item) =>
                              total + item.quantity * item.precio,
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
                    Stripe
                  </label>
                </div>
              </div>
              {/* /Métodos de pago */}
              <CardElement
                id="my-card"
                options={{
                  iconStyle: "solid",
                  style: {
                    base: {
                      iconColor: "#c4f0ff",
                      color: "#000000",
                      fontSize: "16px",
                    },
                    invalid: {
                      iconColor: "#FFC7EE",
                      color: "#FFC7EE",
                    },
                  },
                  hidePostalCode: true, // Oculta el campo del código postal
                }}
              />
              <div className="input-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  <span></span>
                  He leído y acepto los <a href="#">términos y condiciones</a>
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <Button type="submit" className="primary-btn order-submit">
                  Realizar Pedido
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
