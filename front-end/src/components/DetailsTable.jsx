import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllOrders, getOrderWithProducts } from '../api';
import productFormater from '../utils/productFormater';
import SaleHeader from './SaleHeader';

function DetailsTable() {
  const [chosenProduct, setChosenProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [userData, setUserData] = useState({});

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = (quantity * price).toFixed(2).replace('.', ',');
    return unitPrice;
  };

  const { id } = useParams();

  useEffect(() => {
    getOrderWithProducts(id)
      .then(({ sale: { products } }) => {
        const formatedProducts = products.map((product) => productFormater(product));
        setChosenProduct(formatedProducts);
      });
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

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
          {userData.role && chosenProduct.length && chosenProduct.map((prod, index) => (
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
      {userData.role && (
        <h3>
          Total: R$
          <span
            data-testid={ `${userData.role}_order_details__element-order-total-price` }
          >
            {total.toFixed(2).replace('.', ',')}
          </span>
        </h3>
      )}
    </div>
  );
}

export default DetailsTable;
