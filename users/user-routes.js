const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./users-model");

const router = express.Router();

router.post("/register",  async(req, res) => {
  try {
    let user = req.body;
    user.password = bcrypt.hashSync(req.body.password, 12);
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Cannot add user");
  }
});

module.exports = router;
