const user = require("./userController");
const book = require("./bookController");
const transaction = require("./transactionController");
const admin = require("./adminController");

module.exports = {
  user,
  book,
  transaction,
  admin,
};
