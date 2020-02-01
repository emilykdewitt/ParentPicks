import axios from 'axios';
// import apiKeys from '../Helpers/apiKeys.json';

const databaseUrl = 'https://localhost:44377/api/users';

// const getUsers = () => new Promise((resolve, reject) => {
//   axios.get(`${firebaseUrl}/users.json`)
//     .then((resp) => {
//       const userResults = resp.data.PromiseValue;
//       const users = [];
//       Object.keys(userResults).forEach((uid) => {
//         users.push(userResults[uid]);
//       });
//       resolve(users);
//     })
//     .catch(err => reject(err));
// });

const getUserByFirebaseKey = () => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/me`)
    .then((resp) => {
      const user = resp.data;
      resolve(user);
    })
    .catch(err => reject(err));
});

// const getCustomerInfoByEmail = customerEmail => new Promise((resolve, reject) => {
//   axios.get(`${databaseUrl}/customerPersonal/email/${customerEmail}`)
//   .then((resp) => {
//     // const customerPersonal = resp.data;
//     let customer = {};
//     customer = resp.data;
//     console.error('resp data', resp.data);
//     resolve(customer);
//   //   customer.push(customerPersonal);
//   //   resolve(customer);
//   })
//     .catch((error) => {
//       reject(error);
//     });
// });

const addUserToDatabase = userObj => axios.post(`${databaseUrl}/users`, userObj);

const editUserInfo = (userId, userObj) => axios.put(`${databaseUrl}/users/${userId}`, userObj);

export default {
  // getUsers,
  getUserByFirebaseKey,
  addUserToDatabase,
  editUserInfo
};