import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutTable() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);

  return (
    <div className="checkout-table">
      { console.log(chosenProduct) }
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
          <td>
            {}
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default CheckoutTable;
