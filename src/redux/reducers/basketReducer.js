import {
  ADD_QTY_ITEM,
  ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM,
  REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS,
} from "@/constants/constants";
import { addToCart, modifyToCart } from "../../services/authApiService";

export default (state = [], action) => {
  switch (action.type) {
    case SET_BASKET_ITEMS:
      return action.payload;
    case ADD_TO_BASKET:
      if (
        state.some(
          (product) => product.productoId === action.payload.productoId
        )
      ) {
        return state;
      } else {
        console.log(action.payload.productoId);
        addToCart(action.payload.productoId); // Llamada a la función addToCart con el ID del producto
        return [action.payload, ...state];
      }

    case REMOVE_FROM_BASKET:
      return state.filter((product) => product.productoId !== action.payload);
    case CLEAR_BASKET:
      return [];
    case ADD_QTY_ITEM:
      return state.map((product) => {
        if (product.productoId === action.payload) {
          modifyToCart(product.productoId, product.quantity + 1);
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.productoId === action.payload) {
          modifyToCart(product.productoId, product.quantity - 1);
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
    default:
      return state;
  }
};
