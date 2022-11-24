"use strict";
const { Model, BOOLEAN, STRING, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      NIM: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      isAdmin: {
        type: BOOLEAN,
        defaultValue: false,
      },
      verifyEmail: {
        type: BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
