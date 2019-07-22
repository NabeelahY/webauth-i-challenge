const express = require("express");
const uuid = require("uuid");
// const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const restict = require("../middleware");
const {encryptPassword} = require("../auth/auth")

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    // user.password = bcrypt.hashSync(req.body.password, 12);
    user.password = encryptPassword(req.body.password, uuid(), 12);
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Cannot add user");
  }
});

router.post("/login", restict.authenticate, async (req, res) => {
  try {
    res.status(200).json({ message: `Welcome ${req.user.username}!` });
  } catch (error) {
    res.status(500).json("Cannot login");
  }
});

router.get("/users", restict.authenticate, async (req, res) => {
  try {
    let users = await Users.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Error getting users");
  }
});

module.exports = router;
