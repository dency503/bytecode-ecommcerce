import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { addQtyItem, minusQtyItem } from "@/redux/actions/basketActions";
import { useBasket } from "@/hooks";

const BasketItemControl = ({ product }) => {
  const { addToBasket, isItemOnBasket } = useBasket(product?.id);
  const basketItems = useSelector((state) => state.basket);
  const productItem = basketItems.find((item) => item.id === product?.id);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const onAddQty = () => {
    if (product.quantity < product.maxQuantity) {
      dispatch(addQtyItem(product.productoId));
    }
  };

  const onMinusQty = () => {
    if (product.maxQuantity >= product.quantity && product?.quantity !== 0) {
      dispatch(minusQtyItem(product.productoId));
    }
  };

  const handleAddToBasket = () => {
    addToBasket({
      ...product,
      selectedColor: selectedColor || product?.availableColors[0] || "",
      selectedSize: selectedSize || product?.sizes[0] || "",
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ outline: '1px solid red', borderRadius: '10px', width: '40%', margin: 'auto', textAlign: 'center' }}>
  {!productItem ? (
    <button
      className="btn btn-danger"
      style={{ width: '100%' }}
      onClick={handleAddToBasket}
    >
      Agregar
    </button>
  ) : (
    <div className="d-flex align-items-center">
       {productItem.quantity > 1 ? (<button
        className="btn btn-danger"
       
        disabled={productItem.quantity === 1}
        onClick={onMinusQty}
      >
       
          <i className="fas fa-minus"></i>
        
      </button>) : (<button className="btn btn-danger">
          <i className="fas fa-trash" onClick={handleAddToBasket}></i></button>
        )}

      <input
        type="number"
        onChange={(e) => productItem.quantity = parseInt(e.target.value)}
        value={productItem.quantity}
        className="form-control text-center"
        style={{ color: 'red', fontSize: '16px', width: '50px', border: 'none', outline: 'none' }}
      />

      <button
        className="btn btn-danger"
        style={{  width: '100%' }}
        disabled={product.maxQuantity === productItem.quantity}
        onClick={onAddQty}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )}
</div>

  
  
  );
};

BasketItemControl.propTypes = {
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

export default BasketItemControl;
