import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';

export function ProductCard(props) {
  const { product } = props;
  const { id, name, urlImage, price } = product;
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const buildCart = (quantity) => {
    const updatedProduct = { id, name, urlImage, price, quantity };
    dispatch(addProduct(updatedProduct));
  };

  const increment = () => {
    setCount((prevCount) => {
      prevCount += 1;
      buildCart(prevCount);
      return prevCount;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      const currentCount = prevCount <= 0 ? 0 : prevCount - 1;
      buildCart(currentCount);
      return currentCount;
    });
  };

  return (
    <div className="product-card-container">
      <p
        className="product-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price }

      </p>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p
        className="product-name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => { decrement(); } }
      >
        -
      </button>
      <span
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        {count}
      </span>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => { increment(); } }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
}.isRequired;

export default ProductCard;
