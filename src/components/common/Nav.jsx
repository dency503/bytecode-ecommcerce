import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate y useLocation
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Nav = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const obtenerDatosDeAPI = async () => {
      try {
        const respuesta = await fetch(`${apiUrl}/categorias`);
        const datos = await respuesta.json();
        setCategorias(datos);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    obtenerDatosDeAPI();
  }, []);

  return (
    <nav id="navigation">
      <div className="container">
        <div id="responsive-nav">
          <ul className="main-nav nav d-flex">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <a href="/">Home</a>
            </li>
            {categorias.map((categoria) => (
              <li
                key={categoria.categoriaId}
                className={
                  location.pathname === `/categoria/${categoria.categoriaId}`
                    ? 'active'
                    : ''
                }
              >
                <a href={`/categoria/${categoria.categoriaId}`}>
                  {categoria.nombreCategoria}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
