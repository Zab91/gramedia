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
      Book.belongsToMany(models.Transaction, { through: "TransactionDetails" });
    }
  }
  Book.init(
    {
      Title: {
        type: STRING,
        allowNull: false,
      },
      Author: {
        type: STRING,
        allowNull: false,
      },
      Genre: {
        type: STRING,
        allowNull: false,
      },
      Publisher: {
        type: STRING,
        allowNull: false,
      },
      Images: {
        type: STRING,
        allowNull: false,
      },
      Abstract: {
        type: STRING,
        allowNull: false,
      },
      Quota: {
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
