import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export default async function getProducts() {
  const products = await axios.get(`${BASE_URL}/product`);

  return products;
}
