import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../redux/slices/productSlice';

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
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  return (
    <div className="checkout-table">
      <h1>Checkout Table</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { chosenProduct.map((prod, index) => (
            <tr key={ prod.id }>
              <td>{ index + 1 }</td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { prod.name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { prod.quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { prod.price.replace('.', ',') }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { totalPriceEachProduct(prod.quantity, prod.price) }
              </td>
              <td>
                <button
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ () => removeItem(prod.id) }
                >
                  Remover Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3
        type="button"
        /* onClick={ checkout } */
        /* disabled={ buttonCart } */
        /* data-testid="customer_products__button-cart" */
      >
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
