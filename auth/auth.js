const md5 = require("md5");

const encryptPassword = (password, salt, iterations = 12) => {
  let hashedPassword = password;
  for (let i = 0; i < iterations; i++) {
    hashedPassword = md5(`${salt}${password}`) + `${salt}`;
  }
  return hashedPassword + `$${salt}`;
};

const compareHashed = (password, hashPassword, iterations = 12) => {
  const salt = hashPassword.match(/([$*]).+/gi)[0].substring(1);
  return encryptPassword(password, salt, iterations) === hashPassword;
};

module.exports = { encryptPassword, compareHashed };
