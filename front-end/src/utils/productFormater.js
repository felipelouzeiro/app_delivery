const productFormater = ({ id, name, price, urlImage, saleProduct: { quantity } }) => ({
  id,
  name,
  price,
  urlImage,
  quantity,
});

export default productFormater;
