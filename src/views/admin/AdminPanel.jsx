import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './SideBar';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import HourlySalesChart from './BarChart';

const AdminPanel = () => {
  useDocumentTitle("Panel | Admin Bytecode");

  const renderMainContent = () => (
    <Col md={10} className="ml-sm-auto">
      <h1>Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Ventas por hora</Card.Title>
              <HourlySalesChart />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* Otros componentes, gráficos, o información relevante */}
        </Col>
      </Row>
    </Col>
  );

  return (<>{renderMainContent()}</>
    
  );
};

export default AdminPanel;
