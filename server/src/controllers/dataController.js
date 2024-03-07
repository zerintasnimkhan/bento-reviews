const dataService = require("../services/dataService");

exports.fetchOrderDetailsFromMarketPlace = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const data = await dataService.fetchDataFromMarketPlace(orderId);

    return res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchOrderDetailsFromPos = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId);
    const data = await dataService.fetchDataFromPos(orderId);
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
