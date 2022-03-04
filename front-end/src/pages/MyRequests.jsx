import React, { useCallback, useEffect, useState } from 'react';
import socket from '../utils/socketClient';
import { getAllOrders } from '../api';
import NavBar from '../components/CustomerNavbar';
import CardMyRequests from '../components/CardMyRequests';

export default function MyRequests() {
  const [ordersCustomer, setOrdersCustomer] = useState();

  const getRequests = useCallback(async () => {
    const allOrders = await getAllOrders();
    await setOrdersCustomer(allOrders);
  });

  useEffect(() => getRequests(), [getRequests, setOrdersCustomer]);

  socket.on('', async () => getRequests());

  socket.on('', async () => getRequests());

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
