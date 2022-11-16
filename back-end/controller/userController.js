const db = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const user = db.User;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../helper/nodemail.js");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword)
        throw "Password atau Confirm Password Salah";
      if (password.length <= 6) throw "Password Anda kurang dari 6 karakter!";

      const salt = await bcrypt.genSalt(10);
      const hassPash = await bcrypt.hash(password, salt);

      const data = await user.create({
        username,
        email,
        password: hassPash,
      });

      const token = jwt.sign({ NIM: data.NIM }, "gramedia", {
        expiresIn: "4h",
      });
      console.log(token);
      const tempEmail = fs.readFileSync("./email/email.html", "utf-8");
      const tempCompile = await handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        username,
        link: `http://localhost:3000/verification/${token}`,
      });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Verifikasi User",
        html: tempResult,
      });

      res.status(200).send("Akun berhasil dibuat!");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { password, NIM } = req.body;
      const isUserExist = await user.findOne({
        where: {
          NIM,
        },
        raw: true,
      });
      console.log(isUserExist);

      if (!isUserExist) throw "User tidak ada";

      await bcrypt.compare(password, isUserExist.password);

      res.status(200).send("selamat anda login");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  verification: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "gramedia");
      console.log(verify);

      await user.update(
        {
          verifyEmail: true,
        },
        {
          where: {
            NIM: verify.NIM,
          },
        }
      );
      res.status(200).send("Verifikasi Sukses");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
