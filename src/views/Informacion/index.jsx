import React from "react";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-4">Acerca de Nosotros - Bytecode</h2>
          <div className="about-us-content">
            <p>
              Bienvenido a Bytecode, tu destino de compras en línea para productos electrónicos de última generación.
              En Bytecode, nos apasiona la tecnología y estamos comprometidos a proporcionar productos de alta calidad a
              nuestros clientes.
            </p>
            <p>
              <i className="fas fa-laptop-code me-2"></i>
              Nuestra misión es ofrecer una amplia gama de productos, desde laptops y computadoras hasta accesorios y
              gadgets, para satisfacer todas tus necesidades tecnológicas.
            </p>
            <p>
              <i className="fas fa-users me-2"></i>
              En Bytecode, nos enorgullece contar con un equipo de expertos en tecnología apasionados que están siempre
              listos para brindarte asesoramiento y soporte técnico.
            </p>
            <p>
              <i className="fas fa-lightbulb me-2"></i>
              Nos esforzamos por mantenernos a la vanguardia de las últimas tendencias tecnológicas, asegurándonos de
              ofrecer productos innovadores y de alta calidad a nuestros clientes.
            </p>
            <p>
              ¡Gracias por elegir Bytecode como tu tienda de confianza para todas tus necesidades tecnológicas! Estamos
              aquí para proporcionarte la mejor experiencia de compra en línea.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
