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
