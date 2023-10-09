import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-xs-6">
              <div className="footer">
                <h3 className="footer-title">Acerca de Nosotros</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut.
                </p>
                <ul className="footer-links">
                  <li>
                    <a href="#">
                      <i className="fa fa-map-marker"></i>1734 Stonecoal Road
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone"></i>+021-95-51-84
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope-o"></i>email@email.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-xs-6">
              <div className="footer">
                <h3 className="footer-title">Categorías</h3>
                <ul className="footer-links">
                  <li><a href="#">Ofertas</a></li>
                  <li><a href="#">Laptops</a></li>
                  <li><a href="#">Smartphones</a></li>
                  <li><a href="#">Cámaras</a></li>
                  <li><a href="#">Accesorios</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-xs-6">
              <div className="footer">
                <h3 className="footer-title">Información</h3>
                <ul className="footer-links">
                  <li><a href="#">Acerca de Nosotros</a></li>
                  <li><a href="#">Contáctanos</a></li>
                  <li><a href="#">Política de Privacidad</a></li>
                  <li><a href="#">Pedidos y Devoluciones</a></li>
                  <li><a href="#">Términos y Condiciones</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-xs-6">
              <div className="footer">
                <h3 className="footer-title">Servicios</h3>
                <ul className="footer-links">
                  <li><a href="#">Mi Cuenta</a></li>
                  <li><a href="#">Ver Carrito</a></li>
                  <li><a href="#">Lista de Deseos</a></li>
                  <li><a href="#">Seguir mi Pedido</a></li>
                  <li><a href="#">Ayuda</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página inferior */}
      <div id="bottom-footer" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ul className="footer-payments">
                <li>
                  <a href="#">
                    <i className="fa fa-cc-visa" style={{ color: "rgb(46, 42, 165)" }}></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-credit-card" style={{ color: "rgb(255, 255, 255)" }}></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-cc-paypal" style={{ color: "rgb(42, 165, 165)" }}></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-cc-mastercard" style={{ color: "rgb(165, 42, 42)" }}></i>
                  </a>
                </li>
              </ul>
              <span className="copyright">
                Derechos de autor &copy;
            {new Date().getFullYear()} Todos los derechos reservados |
                Esta plantilla está hecha con <i className="fa fa-heart-o" aria-hidden="true"></i> 
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
