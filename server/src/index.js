const express = require("express");
const axios = require('axios');
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const reviewRouter = require("./routers/review.router");
const dataRoutes = require("./routers/dataRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/reviews", reviewRouter);
app.use("/orderDetails", dataRoutes);

// app.get('/fetch-external-data', async (req, res) => {
//   try {
//     const response = await axios.get('https://marketplace-client-bento.koyeb.app/order-details/65d75617b3b361b7e8a457ce');
//     console.log('Status Code:', response.status);
//     console.log('Headers:', response.headers);
//     const data = response.data;
//     res.json(data);
//     console.log('Fetched Data:', data);
//   } catch (error) {
//     console.error('Error fetching external data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

(async function () {
  try {
    await mongoose.connect(config.MONGOOSE_URI);
    console.log("[mongoose]: Connected to DB.");
    app.listen(config.PORT, () =>
      console.log(`[server]: Server is listening on port ${config.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
})();
