const axios = require("axios");

exports.fetchDataFromMarketPlace = async (orderId) => {
  const order = await axios.get(
    "https://marketplace-client-bento.koyeb.app/order-details/" + orderId
  );

  const authToken = process.env.SKL_AUTH;
  const restaurantInfo = await axios.get(
    "https://sak-skeleton-samiya-kazi.koyeb.app/marketplace/restaurant-details/" +
      order.data.restaurantId,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const data = order.data;
  const reviewItems = data.cartItems.map((item) => {
    return {
      subject: "food",
      id: item._id,
      name: item.name,
      image: item.image,
    };
  });

  const restaurantItem = {
    id: data.restaurantId,
    subject: "restaurant",
    name: restaurantInfo.data.restaurantName,
    image: restaurantInfo.data.restaurantCoverPhoto,
  };

  const deliveryManItem = {
    id: "devlivery-man-id",
    subject: "delivery",
    name: "Delivery Service",
    image: "dummy img url",
  };

  reviewItems.push(restaurantItem);
  reviewItems.push(deliveryManItem);

  const orderData = {
    userId: data.userId,
    orderId: orderId,
    restaurantId: data.restaurantId,
    foods: reviewItems,
  };

  return orderData;
};

exports.fetchDataFromPos = async () => {
  const response = await axios.get(
    "https://bento-pos-server.onrender.com/order/" + orderId
  );

  const data = response.data;
  const reviewItems = data.items.map((item) => {
    return {
      subject: "food",
      id: item._id,
      name: item.item.itemName,
      image: item.item.itemImage,
    };
  });

  const restaurantItem = {
    id: data.restaurantId,
    subject: "restaurant",
    name: "Dummy res name",
    image: "dummy img url",
  };

  const deliveryManItem = {
    id: "devlivery-man-id",
    subject: "delivery",
    name: "Delivery Service",
    image: "dummy img url",
  };

  reviewItems.push(restaurantItem);
  reviewItems.push(deliveryManItem);

  const orderData = {
    userId: data.userId,
    orderId: data.orderId,
    restaurantId: data.restaurantId,
    foods: reviewItems,
  };

  return orderData;
};
