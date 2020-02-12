import axios from 'axios';

const databaseUrl = 'https://localhost:44377/api/products';

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch(err => reject(err));
});

const getSingleProduct = productId => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/${productId}`)
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => reject(err));
});

const addProduct = productObj => axios.post(`${databaseUrl}`, productObj)

export default {
  getProducts,
  getSingleProduct,
  addProduct
};
