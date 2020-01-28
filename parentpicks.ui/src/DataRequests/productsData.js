import axios from 'axios';

const databaseUrl = 'https://localhost:44377/api/products';

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch(err => reject(err));
});

const getSingleProduct = productId => axios.get(`${databaseUrl}/products/${productId}`);

export default {
  getProducts,
  getSingleProduct,
};
