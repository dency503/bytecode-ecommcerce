import React from "react";
import { Link } from "react-router-dom";

const ProductoCard = ({ producto, index }) => {
  return (
    <div className="product" key={index}>
      <Link to={`/products/${producto.productoId}`}>
        <div className="product-img">
          <img src={producto.imagenURl} alt={producto.nombreProducto} />
          <div className="product-label">
            {producto.etiquetas && (
              <span key={index} className="sale">
                {producto.etiquetas}
              </span>
            )}
            {producto.nuevo && (
              <span key={index} className="new">
                Nuevo
              </span>
            )}
          </div>
        </div>
        <div className="product-body">
          <p className="product-category">
            {producto.categoria.nombreCategoria}
          </p>
          <h3 className="product-name">
            <p >{producto.nombreProducto}</p>
          </h3>
          <h4 className="product-price">
            ${producto.precio}{" "}
            <del className="product-old-price">${producto.precioAnterior}</del>
          </h4>
          <div className="product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="product-btns">
            <button className="add-to-wishlist">
              <i className="fa fa-heart-o"></i>
              <span className="tooltipp">Favoritos</span>
            </button>
            <button className="add-to-compare">
              <i className="fa fa-exchange"></i>
              <span className="tooltipp">Añadir Compra</span>
            </button>
            <button className="quick-view">
              <i className="fa fa-eye"></i>
              <span className="tooltipp">Ver</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductoCard;
