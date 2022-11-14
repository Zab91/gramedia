const PORT = 3000;
const express = require("express");
const server = express();

server.use(express.json());

server.listen(PORT, () => {
  console.log("SERVER RUNNING AT" + PORT);
});
