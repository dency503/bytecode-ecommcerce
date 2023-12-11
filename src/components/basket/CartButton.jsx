import React from "react";
import { useBasketContext } from "./BasketContext";
import * as ROUTE from "@/constants/routes";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Badge } from "../common";

const CartButton = () => {
  const { pathname } = useLocation();
  const { isBasketVisible, showBasket, hideBasket } = useBasketContext();
  const basketDisabledpathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD,
  ];

  const basketLength = useSelector((state) => state.basket.length);
  return (
    <div>
      {isBasketVisible ? (
        <button
          className="btn"
          disabled={basketDisabledpathnames.includes(pathname)}
          onClick={hideBasket}
          type="button"
        >
          <Badge count={basketLength}>
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: "2.4rem" }}
            ></i>
          </Badge>
        </button>
      ) : (
        <button
          className="btn"
          disabled={basketDisabledpathnames.includes(pathname)}
          onClick={showBasket}
          type="button"
        >
          <Badge count={basketLength}>
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: "2.4rem" }}
            ></i>
          </Badge>
        </button>
      )}
    </div>
  );
};

export default CartButton;
