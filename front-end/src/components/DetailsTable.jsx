import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrders } from '../api';
import SaleHeader from './SaleHeader';

function DetailsTable() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const [total, setTotal] = useState(0);
  const [userOrder, setUserOrder] = useState([]);

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = (quantity * price).toFixed(2).replace('.', ',');
    return unitPrice;
  };

  const { id } = useParams();

  useEffect(() => {
    getAllOrders()
      .then(({ sales }) => setUserOrder(sales.filter((sale) => sale.id === Number(id))));
  }, [id]);

  useEffect(() => {
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  return (
    <div className="checkout-table">
      <h3>Detalhes do pedido</h3>
      {
        userOrder.length && <SaleHeader order={ userOrder } />
      }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {chosenProduct.map((prod, index) => (
            <tr key={ prod.id }>
              <td
                data-testid={
                  `seller_order_details__element-order-details-label-order-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {prod.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {prod.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {prod.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {totalPriceEachProduct(prod.quantity, prod.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total: R$
        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          {total.toFixed(2).replace('.', ',')}
        </span>
      </h3>
    </div>
  );
}

export default DetailsTable;
