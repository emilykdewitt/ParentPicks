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

const getFeedbackByFeedbackId = feedbackId => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/${feedbackId}`)
  .then((result) => {
    resolve(result.data);
  })
  .catch(err => reject(err))
})

const addUserFeedback = userFeedbackObj => axios.post(`${databaseUrl}`, userFeedbackObj);

const editUserFeedback = (feedbackId, feedbackObj) => axios.put(`${databaseUrl}/update/${feedbackId}`, feedbackObj);

const deleteUserFeedback = feedbackId => axios.delete(`${databaseUrl}/${feedbackId}`);

export default { getUserFeedbacksForUser, 
                  getProductFeedbackByProductId, 
                  editUserFeedback, 
                  getFeedbackByFeedbackId, 
                  addUserFeedback,
                  deleteUserFeedback
                };