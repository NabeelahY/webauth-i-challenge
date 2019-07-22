const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./users-model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    user.password = bcrypt.hashSync(req.body.password, 12);
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Cannot add user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedUser = await Users.findUserBy({ username });
    if (loggedUser && bcrypt.compareSync(password, loggedUser.password)) {
      res.status(200).json({ message: `Welcome ${loggedUser.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json("Cannot login");
  }
});

module.exports = router;
