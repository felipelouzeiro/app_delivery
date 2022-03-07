import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DetailsTable() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const [total, setTotal] = useState(0);

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = (quantity * price).toFixed(2).replace('.', ',');
    return unitPrice;
  };

  useEffect(() => {
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  const dataTestidBase = 'seller_order_details__element-order-details-label';

  return (
    <div className="checkout-table">
      <h3>Detalhes do pedido</h3>
      <table>
        <thead>
          <tr>
            <th data-test={ `${dataTestidBase}-order-id` }>
              Pedido

            </th>
            <th>Vendedor</th>
            <th data-testid={ `${dataTestidBase}-order-date` }>
              Data

            </th>
            <th data-testid={ `${dataTestidBase}-delivery-status` }>
              Status

            </th>
            <th>Marcar como entregue</th>
          </tr>
        </thead>
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
          data-testid="customer_checkout__element-order-total-price"
        >
          {total.toFixed(2).replace('.', ',')}
        </span>
      </h3>
    </div>
  );
}

export default DetailsTable;
