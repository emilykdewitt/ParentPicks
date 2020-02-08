import axios from 'axios';
// import apiKeys from '../Helpers/apiKeys.json';

const databaseUrl = 'https://localhost:44377/api/users';

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}`)
    .then((resp) => {
      resolve(resp.data);
    })
    .catch(err => reject(err));
});

const getUserById = (userId) => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/${userId}`)
  .then((resp) => {
    const user = resp.data;
    resolve(user);
  })
  .catch(err => reject(err));
});

const getUserByFirebaseKey = () => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/me`)
    .then((resp) => {
      const user = resp.data;
      resolve(user);
    })
    .catch(err => reject(err));
});

const addUserToDatabase = userObj => axios.post(`${databaseUrl}`, userObj);

const editUserInfo = (userId, userObj) => axios.put(`${databaseUrl}/update/${userId}`, userObj);

export default {
  getUsers,
  getUserByFirebaseKey,
  getUserById,
  addUserToDatabase,
  editUserInfo
};