import React, { useState } from 'react';
import { Tab, Button } from 'react-bootstrap';

const DireccionEnvioTab = ({ address }) => {
  const [showAddressEditModal, setShowAddressEditModal] = useState(false);

  return (
    <>
      {address && (
        <div className="card mt-3">
          <div className="card-body">
            <h4 className="card-title">Dirección de Envío</h4>
            <p className="card-text">
              <strong>Linea 1:</strong> {address?.linea1}
            </p>
            <p className="card-text">
              <strong>Distrito:</strong> {address.distrito?.distrito}
            </p>
            <p className="card-text">
              <strong>Municipio:</strong> {address.distrito?.municipio.municipio}
            </p>
            <p className="card-text">
              <strong>Departamento:</strong>{' '}
              {address.distrito?.municipio.departamento.departamento}
            </p>
            <p className="card-text">
              <strong>Código Postal:</strong> {address.codigoPostal}
            </p>
            <Button
              variant="primary"
              onClick={() => setShowAddressEditModal(true)}
            >
              Editar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DireccionEnvioTab;
