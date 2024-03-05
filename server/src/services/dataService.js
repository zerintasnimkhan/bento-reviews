
const axios = require('axios');

exports.fetchDataFromMarketPlace = async () => {
  const response = await axios.get('https://marketplace-client-bento.koyeb.app/order-details/65d75617b3b361b7e8a457ce');
  return response.data;
};

exports.fetchDataFromPos = async () => {
      const response = await axios.get('https://bento-pos-server.onrender.com/order/65e05370c65250319699558a');
      return response.data;
    };