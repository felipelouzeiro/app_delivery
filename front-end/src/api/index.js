import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getAllOrders = async (Authorization) => {
  const { role, token } = Authorization;
  const URL_ORDER = `${BASE_URL}/${role}/orders`;

  try {
    const { data } = await axios.get(URL_ORDER, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllOrders;
