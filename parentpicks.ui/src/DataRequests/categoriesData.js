import axios from 'axios';

const baseUrl = 'https://localhost:44377/api/category';

const getAllCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`).then((result) => {
    resolve(result.data);
  })
    .catch((error) => {
      reject(error);
    });
});

export default {getAllCategories};