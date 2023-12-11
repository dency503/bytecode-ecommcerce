import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImagenLoader from "./ImagenLoader"
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Producto = ({ nombreCategoria, url_imagen,categoriaId}) => (
  <div className="col-md-4 col-xs-6">
    <Link to={`/categoria/${categoriaId}`} className="cta-btn">
      <div className="shop">
        <div className="shop-img">
          <ImagenLoader src={url_imagen} alt={`Imagen de ${nombreCategoria}`}  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }} />
        </div>
        <div className="shop-body">
          <h3>
            {nombreCategoria}
            <br />
            {nombreCategoria}
          </h3>
          Comprar Ahora <i className="fa fa-arrow-circle-right"></i>
        </div>
      </div>{" "}
    </Link>
  </div>
);

const CategoriaProducto = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerDatosDeAPI = async () => {
      try {
        const respuesta = await fetch(`${apiUrl}/categorias`);
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    obtenerDatosDeAPI();
  }, []);

  const Productos = productos.map((producto, index) => (
    <Producto key={index} {...producto} />
  ));

  return (
    <div className="section">
      <div className="container">
        <div className="row">{Productos}</div>
      </div>
    </div>
  );
};

export default CategoriaProducto;
