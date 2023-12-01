import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { useUserCart } from '../../../hooks/UserCartProvider';

const SignInForm = () => {
  const { fetchData } = useUserCart();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/signin',
        formData,
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      fetchData();
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope" aria-hidden="true"></i> Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
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
                placeholder="Ingresa tu contraseña"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-3">
            <p>
              ¿No tienes una cuenta?{' '}
              <Link to="/signup">Regístrate aquí</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
