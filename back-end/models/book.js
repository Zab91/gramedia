"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: {
        type: STRING,
        allowNull: false,
      },
      author: {
        type: STRING,
        allowNull: false,
      },
      publisher: {
        type: STRING,
        allowNull: false,
      },
      category: {
        type: STRING,
        allowNull: false,
      },
      year: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
