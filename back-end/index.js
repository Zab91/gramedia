const PORT = 2000;
const express = require("express");
const server = express();
const db = require("./models");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

require("dotenv").config();

server.use(express.json());
server.use(cors());
server.use(bearerToken());

const { user, book, transaction } = require("./router");
server.use("/user", user);
server.use("/book", book);
server.use("/transaction", transaction);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("SERVER RUNNING AT " + PORT);
});
