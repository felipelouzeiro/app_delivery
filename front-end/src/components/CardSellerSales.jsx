import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardSellerSales({ orders }) {
  const history = useHistory();

  const { role } = JSON.parse(localStorage.getItem('user'));

  const { id, saleDate, status, totalPrice, deliveryAddress } = orders;

  const newDate = new Date(saleDate);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  const dateFormat = `${day}/${month}/${year}`;

  const ADRESS_SELLER = 'seller_orders__element-card-address-';

  const renderAdress = () => (
    <p data-testid={ `${ADRESS_SELLER}${id}` }>
      {deliveryAddress}
    </p>
  );

  const goToDetails = (idSale) => {
    history.push(`/seller/orders/${idSale}`);
  };

  return (
    <button
      type="button"
      onClick={ () => { goToDetails(id); } }
    >

      <div>
        <p>Pedido</p>
        <p
          data-testid={
            `seller_orders__element-order-id-${id}`
          }
        >
          {id}
        </p>
      </div>

      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        <p>{status}</p>
      </div>

      <div>
        <p
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          {dateFormat}
        </p>
        <p
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          {totalPrice.replace('.', ',')}
        </p>
      </div>
      { role === 'seller' && renderAdress() }
    </button>
  );
}

CardSellerSales.propTypes = {
  orders: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
  }).isRequired,
};

export default CardSellerSales;
