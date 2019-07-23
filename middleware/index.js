const Users = require("../users/users-model");
// const bcrypt = require("bcryptjs");
const { compareHashed } = require("../auth/auth");

module.exports = { authenticate, authenticateUser };
async function authenticate(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    } else {
      const loggedUser = await Users.findUserBy({ username });
      req.user = loggedUser;
      if (req.user && compareHashed(password, req.user.password)) {
        req.session.user = req.user;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized!" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Server error" });
  }
}

async function authenticateUser(req, res, next) {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json("Unauthorized!!!");
    }
  } catch (error) {
    return res.status(400).json({ message: "Server error" });
  }
}
