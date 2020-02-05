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

const addProductToRegistry = registryProductObj => axios.post(`${databaseUrl}`, registryProductObj);

const deleteRegistryProduct = regProdId => axios.delete(`${databaseUrl}/${regProdId}`);

export default { getUserRegistryProductsForUser, addProductToRegistry, deleteRegistryProduct };