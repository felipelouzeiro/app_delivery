import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';

export function ProductCard(props) {
  const { product } = props;
  const { id, name, urlImage, price } = product;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const foundProduct = cart.find((prod) => prod.id === id);
  const [count, setCount] = useState(() => (foundProduct ? foundProduct.quantity : 0));
  const dispatch = useDispatch();

  const buildProduct = (quantity) => {
    const updatedProduct = { id, name, urlImage, price, quantity };
    dispatch(addProduct(updatedProduct));
  };

  const increment = () => {
    setCount((prevCount) => {
      prevCount += 1;
      buildProduct(prevCount);
      return prevCount;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      const currentCount = prevCount <= 0 ? 0 : prevCount - 1;
      buildProduct(currentCount);
      return currentCount;
    });
  };

  const updateByInput = (value) => {
    const num = value ? Number(value) : 0;
    setCount(num);
    buildProduct(num);
  };

  return (
    <section className="product-card-container">
      <div className="product-card-image-container">
        <p
          className="product-price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${price.replace('.', ',')}` }

        </p>
        <img
          className="product-card-image"
          width="20px"
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <div className="product-card-quantity-container">
        <p
          className="product-name"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }

        </p>
        <div className="product-card-quantity-input-container">
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ () => { decrement(); } }
          >
            -
          </button>
          <label htmlFor="count-input">
            <input
              value={ count }
              onChange={ (e) => updateByInput(e.target.value) }
              id="count-input"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              type="number"
              min="0"
            />
          </label>
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ () => { increment(); } }
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
}.isRequired;

export default ProductCard;
