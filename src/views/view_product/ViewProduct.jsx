import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/productos/${id}`)
      .then(response => {
        setProducto(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles del producto:', error);
        setError('No se pudo cargar el producto.');
      });
  }, [id]);

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  if (!producto) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
  <div className="row">
    <div className="col-md-6">
      <img src={producto.imagenURl} alt={producto.nombreProducto} className="img-fluid" />
    </div>
    <div className="col-md-6">
      <h1 className="display-4">{producto.nombreProducto}</h1>
      <p className="lead">Precio: ${producto.precio}</p>
      <p><strong>Descripción:</strong> {producto.descripcionProducto}</p>
      <p><strong>Características:</strong> {producto.caracteristicas}</p>
      <p><strong>Disponibilidad:</strong> {producto.disponibilidad ? 'En stock' : 'Agotado'}</p>
      <p><strong>Categoría:</strong> {producto.categoria.nombreCategoria}</p>
      <button className="btn btn-primary mr-2" onClick={() => addToCart(producto.id)}>
        Agregar al Carrito
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Volver a la Tienda
      </button>
    </div>
  </div>
</div>

  );
};

export default ViewProduct;
