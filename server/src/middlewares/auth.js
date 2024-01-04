const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
  try {
    if (req.get("Authorization")) {
      const token = req.get("Authorization").split(" ")[1];
      const { id } = jwt.verify(token, SECRET);
      const user = await User.getUserById(id);

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(401).send("You are not logged in!");
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).send("Access token has expired.");
    }
    res.status(500);
    console.log(error);
  }
}

module.exports = authMiddleware;
