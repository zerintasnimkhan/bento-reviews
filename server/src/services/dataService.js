
const axios = require('axios');

exports.fetchDataFromMarketPlace = async () => {
  const response = await axios.get('https://marketplace-client-bento.koyeb.app/order-details/65d75617b3b361b7e8a457ce');
  return response.data;
};
