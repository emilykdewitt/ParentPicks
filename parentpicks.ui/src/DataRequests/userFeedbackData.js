import axios from 'axios';

const databaseUrl = 'https://localhost:44377/api/userFeedback';

const getUserFeedbacksForUser= userId => new Promise((resolve, reject) => {
    axios.get(`${databaseUrl}/user/${userId}`).then((result) => {
      resolve(result.data);
    })
      .catch((error) => {
        reject(error);
      });
  }
);

const getProductFeedbackByProductId = productId => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/product/${productId}`).then((result) => {
    resolve(result.data);
  })
    .catch((error) => {
      reject(error);
    });
});

// post new product to user registry

export default { getUserFeedbacksForUser, getProductFeedbackByProductId };