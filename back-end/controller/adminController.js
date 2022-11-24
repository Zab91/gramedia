const db = require("../models");
const { Op } = require("sequelize");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  loginAdmin: async (req, res) => {
    try {
      const { data, password } = req.body;
      const isAdminExist = await admin.findOne({
        where: {
          [Op.or]: {
            email: data ? data : "",
            username: data ? data : "",
          },
        },
        raw: true,
      });

      if (!isAdminExist) throw "Akun Admin tidak ada";

      await bcrypt.compare(password, isAdminExist.password);
      const token = jwt.sign(
        {
          username: isAdminExist.username,
          email: isAdminExist.email,
        },
        "gramedia"
      );

      res.status(200).send({ isAdminExist, token });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hassPash = await bcrypt.hash(password, salt);

      const data = await admin.create({
        username,
        email,
        password: hassPash,
      });

      const token = jwt.sign({ username: data.username }, "gramedia", {
        expiresIn: "4h",
      });
      console.log(token);

      res.status(200).send({
        data,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
