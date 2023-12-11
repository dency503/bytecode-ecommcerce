/* eslint-disable max-len */
import { BasketItem, BasketToggle } from "@/components/basket";
import { Boundary, Modal } from "@/components/common";
import { CHECKOUT } from "@/constants/routes";

import { calculateTotal, displayMoney } from "@/helpers/utils";

import useModal from "../../hooks/useModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { clearBasket } from "@/redux/actions/basketActions";
import { useBasketContext } from "./BasketContext";

const Basket = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth,
  }));
  const history = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();



  const onCheckOut = () => {
    if (basket.length !== 0 && user) {
      document.body.classList.remove("is-basket-open");
      history(CHECKOUT);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove("basket-open");
    history(CHECKOUT);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };
  const { isBasketVisible, hideBasket } = useBasketContext();
  return user && user.role === "ADMIN" ? null : (
    <Boundary>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
        className="modal-dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">
              Debes iniciar sesión para continuar con la compra
            </h5>
            <button type="button" className="close" onClick={onCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={onCloseModal}
                type="button"
              >
                Continuar comprando
              </button>
              <button
                className="btn btn-primary btn-sm ml-2"
                onClick={onSignInClick}
                type="button"
              >
                Iniciar sesión para comprar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {isBasketVisible && (
        <div className={` basket-anim ${isBasketVisible ? "open" : ""}`}>
          <div className="basket">
            <div className="cart-list">
              <div className="basket-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="basket-header-title">
                    Mi carrito &nbsp;
                    <span className="badge badge-secondary">
                      {`${basket?.length} ${
                        basket?.length > 1 ? "productos" : "producto"
                      }`}
                    </span>
                  </h3>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={basket?.length === 0}
                    onClick={onClearBasket}
                    type="button"
                  >
                    Vaciar carrito
                  </button>

                  <button
                    className="btn btn-link"
                    onClick={hideBasket}
                    aria-label="Cerrar carrito"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              {basket?.length <= 0 && (
                <div className="basket-empty">
                  <h5 className="basket-empty-msg">Tu carrito está vacío</h5>
                </div>
              )}
             <div className="product-widget">
              {basket?.map((product, i) => (
               
                <BasketItem
                  key={`${product.productoId}_${i}`}
                  product={product}
                  basket={basket}
                  className={"product-widget"}
                  dispatch={dispatch}
                />
               
              ))}</div>
            </div>
            <div className="basket-checkout">
              <div className="basket-total">
                <p className="basket-total-title">Total a pagar:</p>
                <h2 className="basket-total-amount">
                  {displayMoney(
                    calculateTotal(
                      basket?.map((product) => product.precio * product.quantity)
                    )
                  )}
                </h2>
              </div>
              <button
                className="btn btn-primary"
                disabled={basket?.length === 0 || pathname === "/checkout"}
                onClick={onCheckOut}
                type="button"
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      )}
    </Boundary>
  );
};

export default Basket;
