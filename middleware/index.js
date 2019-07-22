const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

module.exports = { authenticate };
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
      if (req.user && bcrypt.compareSync(password, req.user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Server error" });
  }
}
