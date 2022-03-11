import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUsers, postSales } from '../api';
import { checkoutSchema } from '../utils/schemas';

function CheckoutAddress() {
  const chosenProduct = useSelector((state) => state.chosenProduct.chosenProducts);
  const [filterSellers, setFilterSellers] = useState([]);
  const [address, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const [seller, setSeller] = useState(0);
  const [checkoutButton, setCheckoutButton] = useState(true);
  const history = useHistory();

  const saleProducts = () => {
    const products = [];
    chosenProduct
      .forEach((prod) => {
        const { id, quantity } = prod;
        const product = { productId: id, quantity };
        products.push(product);
      });
    return products;
  };

  const sumTotal = () => {
    let totalPrice = 0;
    chosenProduct
      .forEach((prod) => {
        totalPrice += prod.quantity * prod.price;
      });
    return totalPrice;
  };

  useEffect(() => {
    checkoutSchema.isValid({ address, number })
      .then((valid) => {
        if (valid) setCheckoutButton(false);
        else setCheckoutButton(true);
      });
  });

  const finishOrder = async (e) => {
    e.preventDefault();
    const totalPrice = sumTotal();
    const products = saleProducts();

    const salesData = {
      sellerId: seller,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      products,
    };
    const { data } = await postSales(salesData);
    localStorage.setItem('cart', JSON.stringify([]));
    history.push(`./orders/${data.id}`);
  };

  useEffect(() => {
    getUsers()
      .then((response) => setFilterSellers(response.data
        .filter((client) => client.role === 'seller')));
  }, []);

  useEffect(() => {
    if (filterSellers.length > 0) setSeller(filterSellers[0].id);
  }, [filterSellers]);

  return (
    <section className="checkout-address">
      <div className="checkout-address-input-container">
        <label className="checkout-address-input" htmlFor="sellers">
          P. Vendedora Responsável
          <select
            required
            value={ seller }
            name="sellers"
            data-testid="customer_checkout__select-seller"
            onChange={ (event) => setSeller(event.target.value) }
          >
            {
              filterSellers
                .map((userSeller, index) => (
                  <option
                    key={ index }
                    value={ userSeller.id }
                  >
                    { userSeller.name }
                  </option>))
            }
          </select>
        </label>
        <label className="checkout-address-input street-name" htmlFor="address">
          Endereço
          <input
            required
            type="text"
            name="address"
            onChange={ (event) => setAdress(event.target.value) }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label className="checkout-address-input house-number" htmlFor="number">
          Número
          <input
            required
            type="text"
            name="number"
            onChange={ (event) => setNumber(event.target.value) }
            data-testid="customer_checkout__input-addressNumber"
          />
        </label>
      </div>
      <button
        disabled={ checkoutButton }
        className="checkout-button"
        type="submit"
        onClick={ finishOrder }
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </section>
  );
}

export default CheckoutAddress;
