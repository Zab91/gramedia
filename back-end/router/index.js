const user = require("./userRouter");
const book = require("./bookRouters");
const admin = require("./adminRouter");

module.exports = {
  user,
  book,
  admin,
};
