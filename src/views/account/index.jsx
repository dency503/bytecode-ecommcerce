import React, { useEffect, useState } from "react";
import api from "../../utils/apiConfig";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useScrollTop from "../../hooks/useScrollTop";

const Account = () => {
  useDocumentTitle("Cuenta | ByteCode")
  useScrollTop()

  const [usuario, setUsuario] = useState({
    nombre: "", // Asegúrate de inicializar las propiedades del usuario
    apellido: "",
    email: "",
    pais: "",
    telefono: "",
    direccion: "",
  });
  const handleSaveChanges = () => {};


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
    <div className="container section mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="text-center">
            <img
              src="img/Login.webp"
              alt="Usuario"
              className="img-fluid rounded-circle"
            />
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#contactModal"
            >
              Editar Perfil
            </button>
            <div className="border my-3"></div>
          </div>
        </div>
        <div className="col-md-9">
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
                </div>
              </div>
              <hr />
              {client.direccion && (
                <div className="card mt-3">
                  <div className="card-body">
                    <h4 className="card-title">Dirección de Envío</h4>
                    <p className="card-text">
                      <strong>Linea 1:</strong> {client.direccion.linea1}
                    </p>

                    <p className="card-text">
                      <strong>Distrito:</strong>{" "}
                      {client.direccion.distrito.distrito}
                    </p>
                    <p className="card-text">
                      <strong>Municipio:</strong>{" "}
                      {client.direccion.distrito.municipio.municipio}
                    </p>

                    <p className="card-text">
                      <strong>Departamento:</strong>{" "}
                      {
                        client.direccion.distrito.municipio.departamento
                          .departamento
                      }
                    </p>
                    <p className="card-text">
                      <strong>Código Postal:</strong>{" "}
                      {client.direccion.codigoPostal}
                    </p>
                  </div>
                </div>
              )}

              <hr />
            </div>
          </div>
        </div>
        <div className="container section mt-5">
          {/* Resto del contenido... */}
          <div
            div
            className="modal fade"
            id="contactModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Editar Perfil
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Contenido del formulario para editar el perfil */}
                  <form>
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={usuario.nombre}
                        onChange={(e) =>
                          setUsuario({ ...usuario, nombre: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apellido">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        value={usuario.apellido}
                        onChange={(e) =>
                          setUsuario({ ...usuario, apellido: e.target.value })
                        }
                      />
                    </div>
                    {/* ... otros campos de usuario ... */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
