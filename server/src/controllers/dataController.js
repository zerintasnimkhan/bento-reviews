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
    const data = await dataService.fetchDataFromPos();
    res.json(data);
    // console.log(data);
    // const formattedData = data.items.map((item) => {
    //   return {
    //     subject: item.item.itemName,
    //     image: item.item.itemImage,
    //   };
    // });

    // console.log(formattedData);
    // return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
