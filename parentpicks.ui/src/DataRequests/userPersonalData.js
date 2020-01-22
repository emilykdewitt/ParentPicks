import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = 'https://localhost:44377/api/userPersonal';

const getUserPersonal = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userPersonal.json`)
    .then((resp) => {
      const userPersonals = resp.data;
      const users = [];
      Object.keys(userPersonalResults).forEach((uid) => {
        userPersonals.push(userPersonalResults[uid]);
      });
      resolve(userPersonals);
    })
    .catch(err => reject(err));
});

const getUserInfoByUserId = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((resp) => {
      const user = resp.data;
      if (Object.keys(user).length > 0) {
        Object.keys(user).forEach((usersId) => {
          user[usersId].id = usersId;
          resolve(user[usersId]);
        });
      }
    })
    .catch(err => reject(err));
});

const addUserToDatabase = userObj => axios.post(`${firebaseUrl}/users.json`, userObj);

const deleteUserFromDatabase = userId => axios.delete(`${firebaseUrl}/users/${userId}.json`);

const editUserInfo = (userId, userObj) => axios.put(`${firebaseUrl}/users/${userId}.json`, userObj);

export default {
  addUserToDatabase,
  getUsers,
  getUserInfoByUserId,
  deleteUserFromDatabase,
  editUserInfo,
};