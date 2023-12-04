import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombreCliente: "",
    apellidoCliente: "",
    telefono: "",
    direccion: {
      idDistrito:"",
      linea1: "",
      distrito: "",
      codigoPostal: "",
      pais: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [distritos, setDistritos] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const obtenerDistritos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/distritos`);
        setDistritos(response.data.content);
      } catch (error) {
        console.error("Error al obtener distritos:", error);
      }
    };

    obtenerDistritos();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${apiUrl}/v1/auth/signup`, formData);
      console.log("Signup Successful:", response.data);
      toast.success("Signup Successful");
      navigate("/signIn");
    } catch (error) {
      console.log("Error es", formData.direccion);
      console.error("Error during signup:", error.response.data);
      toast.error("An error occurred during signup. Please try again.");

      // Oculta el toast después de 5 segundos
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAddressChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      direccion: {
        ...prevData.direccion,
        [name]: value,
      },
    }));
  };
  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user" aria-hidden="true"></i> Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                autoComplete="username" // Añade el atributo autocomplete
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope" aria-hidden="true"></i> Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock" aria-hidden="true"></i> Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                autoComplete="current-password" // Añade el atributo autocomplete
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label">
                <i className="fas fa-user" aria-hidden="true"></i> Nombre
                Cliente
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreCliente"
                name="nombreCliente"
                value={formData.nombreCliente}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellidoCliente" className="form-label">
                <i className="fas fa-user" aria-hidden="true"></i> Apellido
                Cliente
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidoCliente"
                name="apellidoCliente"
                value={formData.apellidoCliente}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                <i className="fas fa-phone" aria-hidden="true"></i> Teléfono
              </label>
              <ReactPhoneInput
                inputProps={{
                  name: "telefono",
                  required: true,
                }}
                country="sv"
                value={formData.telefono}
                onChange={(value) =>
                  handleChange({ target: { name: "telefono", value } })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="codigoPostal" className="form-label">
                Código Postal
              </label>
              <input
                type="text"
                className="form-control"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.direccion.codigoPostal}
                onChange={(e) => handleAddressChange(e.target.value, "codigoPostal")}
                required
                placeholder="Enter your postal code"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pais" className="form-label">
                País
              </label>
              <input
                type="text"
                className="form-control"
                id="pais"
                name="pais"
                value={formData.direccion.pais}
                onChange={(e) => handleAddressChange(e.target.value, "pais")}
                required
                placeholder="Enter your country"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linea1" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="linea1"
                name="linea1"
                value={formData.direccion.linea1}
                onChange={(e) => handleAddressChange(e.target.value, "linea1")}
                required
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="distrito" className="form-label">
                Distrito
              </label>
              <select
                className="form-select"
                id="distrito"
                name="distrito"
                value={formData.direccion.distrito}
                onChange={(e) => handleAddressChange(e.target.value, "distrito")}
                required
              >
                <option value="" disabled>
                  Seleccione un distrito
                </option>
                {distritos && distritos.map((distrito) => (
                  <option key={distrito.idDistrito} value={distrito.idDistrito}>
                    {distrito.distrito}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? (
                <div className="spinner-border text-light" role="status"></div>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i> Sign Up
                </>
              )}
            </button>

            {/* Toast for error message */}
            <Toast
              show={showToast && submitError !== null}
              onClose={() => {
                setShowToast(false);
                setSubmitError(null);
              }}
              className="mt-3"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
              }}
              delay={5000} // Delay en milisegundos
              autohide
            >
              <Toast.Header bg="danger">
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>{submitError}</Toast.Body>
            </Toast>
          </form>
        </div>
      </div><ToastContainer/>
    </div>
  );
};

export default SignUpForm;
