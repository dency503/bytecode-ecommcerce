import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserCart } from '../../../hooks/UserCartProvider';

const SignInForm = () => {

  const {  fetchData } = useUserCart();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Corrige la inicialización de navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/signin', formData, {
        withCredentials: true, // Habilita el envío de cookies y credenciales
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      fetchData()
      navigate("/"); // Redirige al usuario a la página principal después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="container"> {/* Agregar una clase de contenedor */}
  <div className="align-items-center justify-content-center" style={{ minHeight: "50vh" }}> {/* Estilos para centrar verticalmente */}
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete='username'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          autoComplete='current-password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Iniciar Sesión
      </button>
    </form>
  </div>
</div>

  

  
  );
};

export default SignInForm;
