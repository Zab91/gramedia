const db = require("../models");
const transaction = db.Transaction;
const user = db.User;
const details = db.TransactionDetails;
const bookdb = db.Book;

module.exports = {
  addLoan: async (req, res) => {
    try {
      const { book } = req.query;

      const checkBook = await bookdb.findOne({
        where: {
          id: book,
        },
        raw: true,
      });

      if (checkBook.Quota < 1) {
        throw "Book Unavailable";
      }

      const add = await transaction.create({
        // loan,
        UserNIM: req.params.NIM,
      });

      const addDetails = await details.create({
        BookId: book,
        TransactionId: add.id,
      });

      const quotaDecrement = await bookdb.decrement(
        { quota: 1 },
        {
          where: {
            id: book,
          },
        }
      );

      // console.log(checkBook.Quota);
      // console.log(add.id);
      // console.log(book);
      // console.log(addDetails);
      // console.log(quotaDecrement);

      res.status(200).send("Book Added");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteLoan: async (req, res) => {
    try {
      const result = await transaction.destroy({
        where: {
          id: req.params.id,
        },
      });
      // console.log(result);

      res.status(200).send("Delete");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  allLoan: async (req, res) => {
    try {
      const result = await transaction.findAll();

      // console.log(result);

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  singularLoan: async (req, res) => {
    try {
      const result = await user.findOne({
        where: {
          NIM: req.params.NIM,
        },
        include: [
          {
            model: transaction,
            include: [
              {
                model: bookdb,
              },
            ],
          },
        ],
      });
      // console.log(result);

      res.status(200).send(result.Transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
