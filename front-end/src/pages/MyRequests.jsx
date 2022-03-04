import React, { useEffect, useState } from 'react';
// import socket from '../utils/socketClient';
import { getAllOrders } from '../api';
import NavBar from '../components/CustomerNavbar';
import CardMyRequests from '../components/CardMyRequests';

export default function MyRequests() {
  const [ordersCustomer, setOrdersCustomer] = useState();

  useEffect(() => {
    getAllOrders()
      .then((orders) => setOrdersCustomer(orders));
  }, []);

  // socket.on('', async () => getRequests());

  return (
    <div>
      <NavBar />
      <div>
        {ordersCustomer.map((order) => (
          <CardMyRequests
            key={ order.id }
            orders={ order }
          />
        ))}
      </div>
    </div>
  );
}
