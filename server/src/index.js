const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
//const authRouter = require("./routers/auth.router");
const reviewRouter = require("./routers/review.router");

const app = express();

app.use(cors());
app.use(express.json());
//app.use("/", authRouter);
app.use("/reviews", reviewRouter);

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
