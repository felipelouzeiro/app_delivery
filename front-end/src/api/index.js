import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getProducts = async () => {
  const products = await axios.get(`${BASE_URL}/product`);

  return products;
};

export const postLogin = async (userEmail, userPassword) => {
  const userData = {
    email: userEmail,
    password: userPassword,
  };

  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response;
  } catch (error) {
    return false;
  }
};
