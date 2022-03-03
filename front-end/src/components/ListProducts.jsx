import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../api';
import { ProductCard } from './ProductCard';
import { addProduct } from '../redux/slices/productSlice';

export function ListProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const dispatch = useDispatch();

  const filterCart = () => {
    const seeCart = chosenProduct.filter((prod) => prod.quantity > 0);
    dispatch(addProduct(seeCart));
    console.log(chosenProduct);
  };

  useEffect(() => {
    getProducts()
      .then((response) => setProducts(response.data));
  }, []);

  useEffect(() => {
    if (chosenProduct === []) return null;
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  return (
    <div className="product-card-container">
      { !products && <h1>Loading</h1>}
      { products.map((prod) => (
        <ProductCard
          key={ prod.id }
          product={ prod }
        />
      ))}
      <button
        type="button"
        onClick={ () => { filterCart(); } }
      >
        { `Ver Carrinho: R$ ${total}` }
      </button>
    </div>
  );
}

export default ListProducts;
