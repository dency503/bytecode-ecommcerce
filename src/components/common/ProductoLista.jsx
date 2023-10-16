import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "../../utils/apiConfig";
import axios from "axios";

/*const productos = [
  {
    imagen: "./img/product01.png",
    categoria: "Laptops",
    nombre: "Producto 1",
    precio: 980.0,
    precioAnterior: 990.0,
    rating: 5,
    nuevo: true,
    etiquetas: ["-30%"],
  },
  {
    imagen: "./img/product02.png",
    categoria: "Teléfonos",
    nombre: "Producto 2",
    precio: 880.0,
    precioAnterior: 900.0,
    rating: 4,
    nuevo: true,
  },
  {
    imagen: "./img/product03.png",
    categoria: "Cámaras",
    nombre: "Producto 3",
    precio: 750.0,
    precioAnterior: 800.0,
    rating: 3,
    nuevo: true,
    etiquetas: ["-10%"],
  },
  // Agrega más productos según sea necesario
];*/

const ProductoLista = () => {
  const [productos, setProductos] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [id, setId] = useState(1);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  useEffect(() => {
    // Hacer una solicitud GET a la API para obtener la lista de productos
    axios
      .get(`${apiUrl}/productos/categoria/${id}?page=0&size=10`)
      .then((response) => {
        // Establecer los productos en el estado usando los datos de la respuesta
        setProductos(response.data.content);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [id]);
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {/* Título de la sección */}
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">Productos Nuevos</h3>
              <div className="section-tab-nav tab-nav">
                <li className={activeTab === "tab1" ? "active" : ""}>
                  <a
                    data-toggle="tab"
                    href="#tab1"
                    onClick={() => {setId(1);setActiveTab("tab1")}}
                  >
                    Laptops
                  </a>
                </li>
                <li className={activeTab === "tab2" ? "active" : ""}>
                  <a
                    data-toggle="tab"
                    href="#tab2"
                    onClick={() =>  {setId(2);setActiveTab("tab2")}}
                  >
                    Teléfonos
                  </a>
                </li>
                <li className={activeTab === "tab3" ? "active" : ""}>
                  <a
                    data-toggle="tab"
                    href="#tab3"
                    onClick={() =>  {setId(3);setActiveTab("tab3")}}
                  >
                    Tablets
                  </a>
                </li>
                
              </div>
            </div>
          </div>

          {/* Pestañas de productos y carrusel */}
          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                {/* Pestaña */}
                <div id="tab1" className="tab-pane active">
                  <div className="products-slick" data-nav="#slick-nav-1">
                    {/* Genera dinámicamente los productos */}
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={3}
                     
                    >
                      {productos.map((producto, index) => (
                        <SwiperSlide key={index}>
                          <ProductoCard producto={producto} index={index} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div id="slick-nav-1" className="products-slick-nav"></div>
                </div>
                {/* /Pestaña */}
              </div>
            </div>
          </div>
          {/* /Pestañas de productos y carrusel */}
        </div>
      </div>
    </div>
  );
};

export default ProductoLista;
