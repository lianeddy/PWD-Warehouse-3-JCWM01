const Crypto = require("crypto");
const { db, createToken } = require("../helpers/index");
// const transporter = require("../helpers/nodemailer");
const { transporter } = require("../helpers");

const {
  loginMdl,
  registerMdl,
  verificationMdl,
  keepLoginMdl,
} = require("../models/userModels");

module.exports = {
  userLogin: (req, res, next) => {
    const data = {
      ...req.body,
    };

    data.password = Crypto.createHmac("sha1", "hash123")
      .update(data.password)
      .digest("hex");

    // query SQL
    const querySelect = `SELECT ?? FROM sys_user WHERE email=? && password=?`;

    // pass to model
    loginMdl(res, querySelect, data.email, data.password, next);
  },
  register: (req, res, next) => {
    const data = { ...req.body };
    // hashing password
    data.password = Crypto.createHmac("sha1", "hash123")
      .update(data.password)
      .digest("hex");

    // query sql
    const queryInsert = `INSERT INTO sys_user SET ?`;
    const querySelect = `SELECT ?? FROM sys_user WHERE email=? && password=?`;

    registerMdl(res, queryInsert, querySelect, data, next);
  },
  verification: async (req, res, next) => {
    const id_user = req.user.id_user;
    // query
    const updateQuery = `UPDATE sys_user SET is_valid=? WHERE id_user=?`;
    // pass to model
    verificationMdl(res, updateQuery, id_user, next);
  },
  changePassword: (req, res) => {
    let { currentPassword, confirmPassword, id_user } = req.body;

    currentPassword = Crypto.createHmac("sha1", "hash123")
      .update(currentPassword)
      .digest("hex");

    let selectQuery = `SELECT password FROM sys_user WHERE id_user = ${db.escape(
      id_user
    )}`;
    console.log(selectQuery);

    confirmPassword = Crypto.createHmac("sha1", "hash123")
      .update(confirmPassword)
      .digest("hex");

    let updateQuery = `UPDATE sys_user SET password = ${db.escape(
      confirmPassword
    )} WHERE id_user = ${db.escape(id_user)}`;
    console.log(updateQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results[0].password === currentPassword) {
        db.query(updateQuery, (err2, results2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send(results2);
        });
      } else {
        return res.status(500).json({ message: "Current Password is Wrong" });
      }
    });
  },
  keepLogin: (req, res, next) => {
    keepLoginMdl(res, req.user, next);
  },

  forgotPassword: (req, res) => {
    let { email } = req.body;
    let selectQuery = `SELECT * FROM sys_user WHERE email = ${db.escape(
      email
    )}`;
    console.log(selectQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results.length === 0) {
        return res
          .status(200)
          .send({ data: results[0], message: "Email not registered" });
      } else {
        let { id_user, username, email, password, is_valid } = results[0];
        let token = createToken({
          id_user,
          username,
          email,
          password,
          is_valid,
        });

        let mail = {
          from: `Admin <4dminPWDHshop@gmail.com>`,
          to: `${email}`,
          subject: `Reset Password`,
          html: `<p>Hai ${username}, you have been requested to reset your password, click link below to continue</p>
          <p><a href='http://localhost:3000/forgot-password-update/${token}'>Click here to reset password</a></p>
          <p>If it's not you, ignore this email</p>
          <p>Thanks!</p>`,
        };
        transporter.sendMail(mail, (errMail, restMail) => {
          if (errMail) {
            console.log(errMail);
            res
              .status(500)
              .send({ message: "req forgot password failed", success: false });
          }
          res.status(200).send({
            message: "Check your email to continue",
            success: true,
          });
        });
      }
    });
  },

  forgotPasswordUpdate: (req, res) => {
    console.log(req.user.id_user);
    let { newPassword } = req.body;

    newPassword = Crypto.createHmac("sha1", "hash123")
      .update(newPassword)
      .digest("hex");

    let updateQuery = `UPDATE sys_user SET password = ${db.escape(
      newPassword
    )} WHERE id_user = ${db.escape(req.user.id_user)}`;
    console.log(updateQuery);
    db.query(updateQuery, (err) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "update password failed", success: false });
      }
      res
        .status(200)
        .send({ message: "update password success ✔", success: true });
    });
  },

  getProfile: (req, res) => {
    let scriptQuery = "Select * from sys_user;";
    if (req.query.id_user) {
      scriptQuery = `Select * from sys_user where id_user = ${db.escape(
        req.query.id_user
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editProfile: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE sys_user set ${dataUpdate} where id_user = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
