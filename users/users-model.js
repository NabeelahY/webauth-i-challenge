const db = require("../database/dbConfig.js");

module.exports = {
  add,
  getUserById,
  findUserBy,
  getAllUsers
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

function findUserBy(params) {
  return db("users").where(params).first();
}

function getAllUsers() {
  return db("users")
}
