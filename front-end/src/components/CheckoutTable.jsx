import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buildCart, removeProduct } from '../redux/slices/productSlice';

import '../styles/checkout.css';

function CheckoutTable() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = (quantity * price).toFixed(2).replace('.', ',');
    return unitPrice;
  };

  const removeItem = (id) => {
    dispatch(removeProduct(id));
  };

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(buildCart(localStorageCart));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(chosenProduct));
  }, [chosenProduct]);

  useEffect(() => {
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  return (
    <div className="checkout-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          { chosenProduct.map((prod, index) => (
            <tr key={ prod.id } className="table-product-row">
              <td
                className="table-product-id"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="table-product-name"
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { prod.name }
              </td>
              <td
                className="table-product-quantity"
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { prod.quantity }
              </td>
              <td
                className="table-product-price"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${prod.price.replace('.', ',')}` }
              </td>
              <td
                className="table-product-subtotal"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${totalPriceEachProduct(prod.quantity, prod.price)}` }
              </td>
              <td>
                <button
                  className="table-product-remove"
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ () => removeItem(prod.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total: R$
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { total.toFixed(2).replace('.', ',') }
        </span>
      </h3>
    </div>
  );
}

export default CheckoutTable;
