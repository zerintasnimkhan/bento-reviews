const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).send("Email or Password is Incorrect");
    } else {
      const user = await User.getUserByEmailForLogin(email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);



        if (isPasswordValid) {
          const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: "7d",
          });

          res.setHeader("Authorization", "Bearer " + token);

          const proj = { _id: 1, name: 1, email: 1, type: 1 };
          const projectedUser = await User.getUserByEmail(email, proj);

          res.status(200).send({ user: projectedUser, token: token });
        } else {
          res.status(403).send("Invalid password.");
        }
      } else {
        res.status(403).send("There is no account with this email.");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
}

async function register(req, res) {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(403).send("Invalid registration info.");
    } else {
      const checkUser = await User.getUserByEmail(email);

      if (checkUser?.email) {
        res.status(403).send("An account with this email already exists.");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        ///console.log(name,email,pass,type)
        const result = await User.createUser(name, email, pass);
        

        const proj = { _id: 1, name: 1, email: 1, password: 1 };

        const projectedUsers = await User.getUserByEmail(email, proj);

        const token = jwt.sign({ id: result._id }, SECRET, {
          expiresIn: "7d",
        });

        res.setHeader("Authorization", "Bearer " + token);
        res.status(201).send(projectedUsers[0]);
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

async function registerRestaurant(req, res) {
  try {
    const { name, email, password, type } = req.body;
    if (!name || !email || !password || type) {
      res.status(403).send("Invalid registration info.");
    } else {
      const checkUser = await User.getUserByEmail(email);
      if (checkUser?.email) {
        res.status(403).send("An account with this email already exists.");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);

        const result = await User.createUser(name, email, pass, type);
        const proj = { _id: 1, name: 1, email: 1, password: 1, type: 1 };
        const projectedUsers = await User.getUserByEmail(email, proj);

        const token = jwt.sign({ id: result._id }, SECRET);
        res.setHeader("Authorization", "Bearer " + token);
        res.status(201).send(projectedUsers[0]);
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}


async function getAuthUserInfo (req, res) {
  try {
    res.send({ user: req.user});
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
module.exports = { register, login, registerRestaurant, getAuthUserInfo };
