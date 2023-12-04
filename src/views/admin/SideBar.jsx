import React from "react";
import { Col, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom"; // Importa NavLink y useLocation
import * as ROUTES from "@/constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCube, faBriefcase, faList, faSitemap, faUser, faTags, faTruck, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const location = useLocation();
  
    return (
      <Col md={2} className="bg-dark sidebar">
        {/* Menú de navegación */}
        <Navbar.Brand href={ROUTES.HOME} className="text-light navbar-dark">
          Admin Panel
        </Navbar.Brand>
        <Nav className="flex-column">
          <NavLink exact to={ROUTES.ADMIN_DASHBOARD} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faChartBar} /> Dashboard
          </NavLink>
          <NavLink to={ROUTES.ADMIN_PRODUCTO} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faCube} /> Gestionar Productos
          </NavLink>
          <NavLink to={ROUTES.ADMIN_CARGOS} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faBriefcase} /> Cargo
          </NavLink>
          <NavLink to={ROUTES.ADMIN_CLIENTES} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faList} /> Clientes
          </NavLink>
          <NavLink to={ROUTES.ADMIN_CATEGORIAS} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faSitemap} /> Categoría
          </NavLink>
          <NavLink to={ROUTES.ADMIN_EMPLEADOS} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faUser} /> Empleado
          </NavLink>
          <NavLink to={ROUTES.ADMIN_MARCAS} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faTags} /> Marca
          </NavLink>
          <NavLink to={ROUTES.ADMIN_PROVEEDORES} className="nav-link text-light" activeClassName="active">
            <FontAwesomeIcon icon={faTruck} /> Proveedores
          </NavLink>
          <NavLink to={ROUTES.ADMIN_VENTAS} className="nav-link text-light" activeClassName="active">
          <FontAwesomeIcon icon={faMoneyBillWave} /> Ventas
        </NavLink>
          {/* Enlace externo a YouTube */}
          <NavLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="nav-link text-light" target="_blank" rel="noopener noreferrer">
        Configuración
      </NavLink>
        </Nav>
      </Col>
    );
  };
  
  export default Sidebar;