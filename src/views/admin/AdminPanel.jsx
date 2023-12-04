import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import Sidebar from './SideBar';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AdminPanel = () => {
    useDocumentTitle("Inicio | Admin Bytecode")
  return (
    <Container fluid>
      <Row>
      
        <Col md={10} className="ml-sm-auto">
          {/* Contenido principal del panel de administrador */}
          <h1>Main Content</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
