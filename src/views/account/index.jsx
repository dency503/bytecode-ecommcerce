import React, { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useScrollTop from "../../hooks/useScrollTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistorialComprasTab from "./HistorialComprasTab";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faMoneyBillWave,
  faCreditCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DireccionEnvioTab from "./DireccionEnvioTab"
const Account = () => {
  useDocumentTitle("Cuenta | ByteCode");
  const [showPersonalEditModal, setShowPersonalEditModal] = useState(false);
  const [showAddressEditModal, setShowAddressEditModal] = useState(false);

  useScrollTop();
  const [client, setClient] = useState({});
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [key, setKey] = useState("personal");
  const [address, setAddress] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    pais: "",
    telefono: "",
    direccion: "",
  });
  const handleSaveChanges = () => {};
  const handleSaveAddressChanges = () => {
    // Lógica para guardar los cambios en la dirección
    // Puedes utilizar una solicitud PUT a tu API para actualizar la dirección
    setShowAddressEditModal(false);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    // ... Código previo ...
    console.log(address.departamentoId);
    if (address.departamentoId !== "") {
      axios
        .get(`${apiUrl}/municipios/departamento/${address.departamentoId}`)
        .then((response) => {
          setMunicipios(response.data.content);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de municipios:", error);
        });
    }
  }, [address.departamentoId]);
  const handleEditClick = () => {
    setShowEditModal(true);
  };
 

  useEffect(() => {
    // Hacer una solicitud GET a la API para obtener el nombre
    api
      .get("/v1/auth/user")
      .then((response) => {
        // Establecer el nombre en el estado usando los datos de la respuesta
        setClient(response.data);
        setAddress(response.data.direccion);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });

    axios
      .get(`${apiUrl}/departamentos`)
      .then((response) => {
        setDepartamentos(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de departamentos:", error);
      });
  }, [localStorage.getItem("token")]);
  return (
    <div className="container section mt-5">
      <div className="row">
        <div className="col-md-12">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="personal" title="Información Personal">
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
                      <Button variant="primary" onClick={handleEditClick}>
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="direccion" title="Dirección de Envío">
              <DireccionEnvioTab address={address} />
            </Tab>
            <Tab eventKey="compras" title="Historial de Compras">
              <HistorialComprasTab />
            </Tab>
          </Tabs>

          {/* Modal de Edición */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Contenido del formulario para editar la información */}
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={client.nombreCliente}
                    onChange={(e) =>
                      setClient({ ...client, nombreCliente: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={client.apellidoCliente}
                    onChange={(e) =>
                      setClient({ ...client, apellidoCliente: e.target.value })
                    }
                  />
                </div>
                {/* Otros campos de usuario */}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showAddressEditModal}
            onHide={() => setShowAddressEditModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Dirección de Envío</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label htmlFor="departamento">Departamento</label>
                  <select
                    className="form-control"
                    id="departamento"
                    value={address.departamentoId}
                    onChange={(e) => {
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        departamentoId: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((departamento) => (
                      <option
                        key={departamento.idDepartamento}
                        value={departamento.idDepartamento}
                      >
                        {departamento.departamento}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="municipio">Municipio</label>
                  <select
                    className="form-control"
                    id="municipio"
                    value={address.municipioId}
                    onChange={(e) =>
                      setAddress({ ...address, municipioId: e.target.value })
                    }
                  >
                    <option value="">Selecciona un municipio</option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id} value={municipio.id}>
                        {municipio.municipio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="distrito">Distrito</label>
                  <input
                    type="text"
                    className="form-control"
                    id="distrito"
                    value={address.distrito?.distrito}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        distrito: {
                          ...address?.distrito,
                          distrito: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="linea1">Línea 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="linea1"
                    value={address.linea1}
                    onChange={(e) =>
                      setAddress({ ...address, linea1: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="codigoPostal">Código Postal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigoPostal"
                    value={address.codigoPostal}
                    onChange={(e) =>
                      setAddress({ ...address, codigoPostal: e.target.value })
                    }
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddressEditModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSaveAddressChanges}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Account;
