import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api';
import NavBar from '../components/CustomerNavbar';
import OrdersCards from '../components/OrdersCards';

import '../styles/ordersCard.css';

export default function MyRequests() {
  const [ordersCustomer, setOrdersCustomer] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then(({ sales }) => setOrdersCustomer(sales));
  }, []);

  return (
    <main>
      <NavBar />
      <section className="order-cards-container">
        {ordersCustomer.length && (
          ordersCustomer.map((order) => (
            <OrdersCards
              key={ order.id }
              orders={ order }
            />
          ))
        )}
      </section>
    </main>
  );
}
