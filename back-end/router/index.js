const user = require("./userRouter");
const book = require("./bookRouters");
const transaction = require("./transactionRouter");

module.exports = {
  user,
  book,
  transaction,
};
