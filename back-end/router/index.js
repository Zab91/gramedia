const user = require("./userRouter");
const book = require("./bookRouters");
const transaction = require("./transactionRouter");
const admin = require("./adminRouter");

module.exports = {
  user,
  book,
  transaction,
  admin,
};
