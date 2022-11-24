const { Op } = require("sequelize");
const db = require("../models");
const book = db.Book;

module.exports = {
  add: async (req, res) => {
    try {
      const { title, author, publisher, category, year } = req.body;
      //   console.log(bookName);
      //   console.log(req.body);

      await book.create({
        title,
        author,
        publisher,
        category,
        year,
      });

      res.status(200).send("Book Added");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  all: async (req, res) => {
    try {
      const { sort, direction, pagination } = req.query;
      // console.log(sort);

      const result = await book.findAll({
        order: [[sort ? sort : "id", direction ? direction : "ASC"]],
        limit: 10,
        offset: pagination ? +pagination : 0,
        raw: true,
      });

      // console.log(result);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  search: async (req, res) => {
    try {
      const { data } = req.query;
      // console.log(data);

      const result = await book.findAll({
        where: {
          [Op.or]: {
            title: {
              [Op.like]: `%${data}%`,
            },
            author: {
              [Op.like]: `%${data}%`,
            },
          },
        },
        raw: true,
      });

      //   console.log(result);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  filter: async (req, res) => {
    try {
      const { genre, sort, direction, pagination } = req.query;

      const result = await book.findAll({
        where: {
          category: genre,
        },
        order: [[sort ? sort : "id", direction ? direction : "ASC"]],
        limit: 10,
        offset: pagination ? +pagination : 0,
        raw: true,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  detail: async (req, res) => {
    try {
      // console.log(req.params.id)
      const result = await book.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });

      // console.log(result);

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  delete: async (req, res) => {
    try {
      await book.destroy({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send("Delete Berhasil");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  edit: async (req, res) => {
    try {
      await book.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("update berhasil");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
