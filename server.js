const express = require("express");

const UserRouter = require("./users/user-routes");
const session = require("express-session");
const sessionConfig = {
  name: "sessionId",
  secret: "secret key",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};
const server = express();

server.use(express.json());
server.use(session(sessionConfig));
server.use("/api", UserRouter);

module.exports = server;
