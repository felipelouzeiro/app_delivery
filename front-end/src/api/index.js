import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getAllOrders = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  const URL_ORDER = `${BASE_URL}/sales`;

  try {
    const { data } = await axios.get(URL_ORDER, {
      headers: {
        authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProducts = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const headers = {
    authorization: token,
  };
  try {
    const products = await axios.get(`${BASE_URL}/product`, { headers });
    return products;
  } catch (error) {
    return false;
  }
};

export const getUsers = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const headers = {
    authorization: token,
  };
  const users = await axios.get(`${BASE_URL}/user`, { headers });
  return users;
};

export const register = async (data) => {
  const dataRegister = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role ? data.role : 'customer',
  };

  try {
    const response = await axios.post(`${BASE_URL}/register`, dataRegister);
    return response;
  } catch (error) {
    return false;
  }
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

export const postSales = async (saleData) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const headers = {
    authorization: token,
  };
  try {
    const response = await axios.post(`${BASE_URL}/sales`, saleData, { headers });
    return response;
  } catch (error) {
    return false;
  }
};
