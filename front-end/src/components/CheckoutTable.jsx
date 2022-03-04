import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutTable() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = quantity * price;
    return unitPrice.toFixed(2).replace('.', ',');
  };

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
          { chosenProduct.map((prod, index) => (
            <tr key={ prod.id }>
              <td>{ index + 1 }</td>
              <td>{ prod.name }</td>
              <td>{ prod.quantity }</td>
              <td>{ prod.price }</td>
              <td>{ () => { totalPriceEachProduct(prod.quantity, prod.price); } }</td>
              <td>
                <button
                  type="button"
                >
                  Remover Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckoutTable;
