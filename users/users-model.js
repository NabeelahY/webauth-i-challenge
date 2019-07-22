const db = require("../database/dbConfig.js");

module.exports = {
  add,
  getUserById
};

function add(user) {
  return db("users")
    .insert(user)
    .then(([id]) => getUserById(id));
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}
