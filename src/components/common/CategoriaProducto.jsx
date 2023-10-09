import React from 'react'

const CategoriaProducto = () => {
    const productos = [
        { nombre: 'Laptop', imagen: './img/shop01.png', descripcion: 'Laptop Coleccion' },
        { nombre: 'Audifonos', imagen: './img/shop03.png', descripcion: 'Audifonos Coleccion' },
        { nombre: 'Camaras', imagen: './img/shop02.png', descripcion: 'Camaras Coleccion' }
    ];
    
  return (
    <div className="section">
            <div className="container">
                <div className="row">
                    {productos.map((producto, index) => (
                        <div className="col-md-4 col-xs-6" key={index}>
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={producto.imagen} alt={producto.nombre} />
                                </div>
                                <div className="shop-body">
                                    <h3>{producto.nombre}<br />{producto.descripcion}</h3>
                                    <a href="#" className="cta-btn">Comprar Ahora <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default CategoriaProducto