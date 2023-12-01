import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductoCard from "./ProductoCard";

const BusquedaProducto = () => {
  const { termino } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [productos, setProductos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/productos/buscar?termino=${termino}&page=${currentPage}`
        );
        setProductos(response.data.content);
        setPageCount(response.data.totalPages);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Error al obtener productos. Inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchData();
  }, [termino, currentPage, apiUrl]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="title">Resultados de la búsqueda para "{termino}"</h3>
              </div>
            </div>

            <div className="col-md-12">
              <div className="row">
                <div className="products-tabs">
                  <div className="tab-pane active">
                    {loading ? (
                      <p>Cargando productos...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      <>
                        <div className="products-slick" data-nav={`#slick-nav-${termino}`}>
                          <Swiper spaceBetween={50} slidesPerView={3}>
                            {productos &&
                              productos.map((producto, index) => (
                                <SwiperSlide key={index}>
                                  <ProductoCard producto={producto} index={index} />
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </div>
                        <div id={`slick-nav-${termino}`} className="products-slick-nav"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Paginación */}
            <div className="pagination-container text-center mt-4 mb-4">
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
                pageLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
              />
            </div>
            {/* /Paginación */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusquedaProducto;
