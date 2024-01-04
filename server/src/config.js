require("dotenv").config();

const config = {
  PORT: process.env.PORT || '3000',
  MONGOOSE_URI: process.env.MONGOOSE_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'zerinsecret'
}

module.exports = config;
