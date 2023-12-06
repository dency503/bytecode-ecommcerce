import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PaymentComponent = () => {
  const [paymentIntentDto, setPaymentIntentDto] = useState({
    amount: 1000,
    currency: "usd",
  });

  const handlePayment = async () => {
    const userConfirmed = window.confirm("¿Quieres realizar el pago?");

    if (userConfirmed) {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      try {
        const response = await fetch(`${apiUrl}/payment/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentIntentDto),
        });

        if (!response.ok) {
          throw new Error("Error al realizar el pago");
        }

        const paymentStr = await response.json();
        // Mostrar mensaje de éxito
        toast.success("Pago creado exitosamente");
        console.log("el id es " + paymentStr.id);
        // Aquí puedes realizar la confirmación en el servidor
        const confirmResponse = await fetch(
          `${apiUrl}/confirm/${paymentStr.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Puedes enviar datos adicionales si es necesario
            // body: JSON.stringify({ /* datos adicionales */ }),
          }
        );

        if (!confirmResponse.ok) {
          throw new Error("Error al confirmar el pago");
        }

        toast.success("Pago confirmado");
      } catch (error) {
        toast.error(`Error al procesar el pago: ${error.message}`);
        console.error("Error al procesar el pago:", error.message);
      }
    } else {
      toast.info("Pago cancelado");
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Realizar Pago</button>
      <ToastContainer />
    </div>
  );
};

export default PaymentComponent;
