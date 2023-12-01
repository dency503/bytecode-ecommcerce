import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import api from "../../utils/apiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductoCard from "./ProductoCard";

const ListaCategoria = () => {
  const [productos, setProductos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { categoriaId } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/productos/categoria/${categoriaId}?page=${currentPage}&size=10`
        );
        setProductos(response.data.content);
        setPageCount(response.data.totalPages);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchData();
  }, [categoriaId, currentPage, apiUrl]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">Productos de la categoría {categoriaId}</h3>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                <div id={`tab${categoriaId}`} className="tab-pane active">
                  <div className="products-slick" data-nav={`#slick-nav-${categoriaId}`}>
                    <Swiper spaceBetween={50} slidesPerView={3}>
                      {productos &&
                        productos.map((producto, index) => (
                          <SwiperSlide key={index}>
                            <ProductoCard producto={producto} index={index} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                  <div id={`slick-nav-${categoriaId}`} className="products-slick-nav"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Paginación */}
          <div className="col-md-12">
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
          {/* /Paginación */}
        </div>
      </div>
    </div>
  );
};

export default ListaCategoria;
