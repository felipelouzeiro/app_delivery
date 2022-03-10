import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../api';
import { ProductCard } from './ProductCard';
import { buildCart } from '../redux/slices/productSlice';

import '../styles/productCard.css';

export function ListProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [buttonCart, setButtonCart] = useState(true);
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const history = useHistory();
  const dispatch = useDispatch();

  const checkout = () => {
    if (chosenProduct.length === 0) return null;
    localStorage.setItem('cart', JSON.stringify(chosenProduct));
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(buildCart(localStorageCart));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(chosenProduct));
  }, [chosenProduct]);

  useEffect(() => {
    getProducts()
      .then((response) => setProducts(response.data));
  }, []);

  useEffect(() => {
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  useEffect(() => {
    if (chosenProduct.length === 0) setButtonCart(true);
    else setButtonCart(false);
  }, [chosenProduct]);

  return (
    <>
      <div className="list-product-container">
        { !products && <h1>Loading</h1>}
        { products.map((prod) => (
          <ProductCard
            key={ prod.id }
            product={ prod }
          />
        ))}
      </div>
      <button
        type="button"
        className="product-checkout-button"
        onClick={ checkout }
        disabled={ buttonCart }
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { total.toFixed(2).replace('.', ',') }
        </span>
      </button>
    </>
  );
}

export default ListProducts;
