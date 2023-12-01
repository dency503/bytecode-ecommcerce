import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "../../utils/apiConfig";
import axios from "axios";
import { Link } from "react-router-dom";


const ProductoLista = () => {
  const [productos, setProductos] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [id, setId] = useState(1);
  const [dataCache, setDataCache] = useState({});
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    // Verificar si los datos ya están en caché
    if (dataCache[id]) {
      setProductos(dataCache[id]);
    } else {
      // Hacer una solicitud GET a la API solo si los datos no están en caché
      axios
        .get(`${apiUrl}/productos/categoria/${id}?page=0&size=10`)
        .then((response) => {
          // Establecer los productos en el estado usando los datos de la respuesta
          setProductos(response.data.content);
          // Guardar los datos en caché
          setDataCache((prevDataCache) => ({
            ...prevDataCache,
            [id]: response.data.content,
          }));
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error);
        });
    }
  }, [id, dataCache]);

  const handleTabClick = (categoryId) => {
    setId(categoryId);
    setActiveTab(`tab${categoryId}`);
  };

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
                    onClick={() => handleTabClick(1)}
                  >
                    Laptops
                  </a>
                </li>
                <li className={activeTab === "tab2" ? "active" : ""}>
                  <a
                    data-toggle="tab"
                    href="#tab2"
                    onClick={() => handleTabClick(2)}
                  >
                    Teléfonos
                  </a>
                </li>
                <li className={activeTab === "tab3" ? "active" : ""}>
                  <a
                    data-toggle="tab"
                    href="#tab3"
                    onClick={() => handleTabClick(3)}
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
                      {productos && productos.map((producto, index) => (
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
};export default ProductoLista;