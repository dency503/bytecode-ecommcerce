import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromBasket } from "@/redux/actions/basketActions";
import { BasketItemControl } from '@/components/basket';
import { displayMoney } from "@/helpers/utils";
import { deleteFromCart } from "../../services/authApiService";
const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => {
    dispatch(removeFromBasket(product.productoId));
    deleteFromCart(product.productoId);
    
  };

  return (
    <div className="basket-item border rounded p-3 mb-3">
     
      <div className="d-flex align-items-center">
        <Link
          to={`/product/${product.productoId}`}
          onClick={() => document.body.classList.remove("is-basket-open")}
          className="text-decoration-none"
        >
          <img
            src={product.imagenURl}
            alt={product.nombreProducto}
            className="basket-item-img img-thumbnail mr-3"
            style={{ maxWidth: "100px" }}
          />
        </Link>
        <div className="basket-item-details flex-grow-1">
          <Link
            to={`/product/${product.productoid}`}
            onClick={() => document.body.classList.remove("is-basket-open")}
            className="text-decoration-none"
          >
            <h4 className="basket-item-name mb-2">{product.nombreProducto}</h4>
          </Link>
          <div className="basket-item-specs">
            <div className="mb-2">
              <span className="font-weight-bold">Quantity:</span>
              <span className="ml-2">{product.quantity}</span>
            </div>
          </div>
        </div>
        <BasketItemControl product={product} />
        <div className="basket-item-price">
          <h4>{displayMoney(product.precio * product.quantity)}</h4>
        </div>
        <button
          className="basket-item-remove btn btn-danger ml-3"
          onClick={onRemoveFromBasket}
          type="button"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    maxQuantity: PropTypes.number,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    selectedSize: PropTypes.string,
    selectedColor: PropTypes.string,
    imageCollection: PropTypes.arrayOf(PropTypes.string),
    sizes: PropTypes.arrayOf(PropTypes.number),
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    isFeatured: PropTypes.bool,
    isRecommended: PropTypes.bool,
    availableColors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BasketItem;
