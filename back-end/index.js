const PORT = 3000;
const express = require("express");
const server = express();

server.use(express.json());

console.log("FILTER")

server.listen(PORT, () => {
  console.log("SERVER RUNNING AT" + PORT);
});
