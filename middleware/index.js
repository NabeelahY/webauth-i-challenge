const Users = require("../users/users-model");
// const bcrypt = require("bcryptjs");
const { compareHashed } = require("../auth/auth");

module.exports = { authenticate };
async function authenticate(req, res, next) {
  try {
    // const { username, password } = req.headers;
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    } else {
      const loggedUser = await Users.findUserBy({ username });
      req.user = loggedUser;
      if (req.user && compareHashed(password, req.user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized!" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Server error" });
  }
}
