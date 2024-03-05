// controllers/dataController.js
const dataService = require("../services/dataService");

exports.fetchOrderDetailsFromMarketPlace = async (req, res) => {
  try {
    const data = await dataService.fetchDataFromMarketPlace();
    res.json(data);
    console.log(data);
    const itemNames = data.cartItems.map((item) => item.name);
    const itemImages = data.cartItems.map((item) => item.image);

    console.log("Item Names:", itemNames);
    console.log("Item Images:", itemImages);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchOrderDetailsFromPos = async (req, res) => {
  try {
    const data = await dataService.fetchDataFromPos();
    res.json(data);
    console.log(data);
    const itemNames = [];
    const itemImages = [];

    data.items.forEach((item) => {
      if (item.item) {
        const itemName = item.item.itemName;
        const itemImage = item.item.itemImage;
        itemNames.push(itemName);
        itemImages.push(itemImage);
      }
    });
    console.log("Item Names:", itemNames);
    console.log("Item Images:", itemImages);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
