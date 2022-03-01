import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// export const getProducts = async () => {
//   const products = await axios.get(`${BASE_URL}/product`);

//   return products;
// };

export const register = async (data) => {
  const dataRegister = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'customer',
  };

  try {
    const response = await axios.post(`${BASE_URL}/register`, dataRegister);
    return response;
  } catch (error) {
    return false;
  }
};

export default {
  register,
};
