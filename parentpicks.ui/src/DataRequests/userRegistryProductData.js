import axios from 'axios';

const databaseUrl = 'https://localhost:44377/api/userRegistryProduct';

const getUserRegistryProductsForUser= userId => new Promise((resolve, reject) => {
    axios.get(`${databaseUrl}/${userId}`).then((result) => {
      resolve(result.data);
    })
      .catch((error) => {
        reject(error);
      });
  });

// post new product to user registry

export default { getUserRegistryProductsForUser };