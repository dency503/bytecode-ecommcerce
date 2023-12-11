
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addQtyItem, minusQtyItem } from '@/redux/actions/basketActions';

const BasketItemControl = ({ product }) => {
  const dispatch = useDispatch();

  const onAddQty = () => {
    if (product.quantity < product.stock) {
      dispatch(addQtyItem(product.productoId));
      
    }
  };

  const onMinusQty = () => {
    if ((product.stock >= product.quantity) && product.quantity !== 0) {
      dispatch(minusQtyItem(product.productoId));
    }
  };

  return (
    <div className="basket-item-control">
  <button
    className="btn btn-outline-secondary btn-sm basket-control basket-control-add"
    disabled={product.stock === product.quantity}
    onClick={onAddQty}
    type="button"
  >
    <i className="fas fa-plus" style={{ fontSize: '9px' }}></i>
  </button>
  <button
    className="btn btn-outline-secondary btn-sm basket-control basket-control-minus"
    disabled={product.quantity === 1}
    onClick={onMinusQty}
    type="button"
  >
    <i className="fas fa-minus" style={{ fontSize: '9px' }}></i>
  </button>
</div>

  );
};

BasketItemControl.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    quantity: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.string),
    sizes: PropType.arrayOf(PropType.number),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default BasketItemControl;
