import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../api';
import formDate from '../utils/dateFormat';

function SaleHeader({ order }) {
  const { status, id, sellerId, saleDate } = order[0];
  const [sellerName, setSellerName] = useState('');
  const [deliveryCheck, setDeliveryCheck] = useState(true);

  useEffect(() => {
    getUsers()
      .then(({ data: users }) => {
        const sellerData = users.filter((user) => user.id === sellerId)[0];
        setSellerName(sellerData.name);
      });
  }, [sellerId]);

  useEffect(() => {
    if (status === 'Em Trânsito') setDeliveryCheck(false);
  }, [status]);

  const orderdate = formDate(saleDate);
  const dataTestidBase = 'customer_order_details__element-order-details-label';

  return (
    <div className="details-heading">
      <p data-testid={ `${dataTestidBase}-order-id` }>
        {id}
      </p>
      <p data-testid={ `${dataTestidBase}-seller-name` }>
        {sellerName}
      </p>
      <p data-testid={ `${dataTestidBase}-order-date` }>
        {orderdate}
      </p>
      <p data-testid={ `${dataTestidBase}-delivery-status` }>
        {status}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ deliveryCheck }
      >
        Marcar como entregue
      </button>
    </div>
  );
}

SaleHeader.propTypes = {
  order: PropTypes.arrayOf(PropTypes.shape({
    sellerId: PropTypes.number,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
};
export default SaleHeader;
