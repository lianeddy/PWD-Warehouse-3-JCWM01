const Crypto = require("crypto");
const { db, createToken } = require("../helpers/index");
const transporter = require("../helpers/nodemailer");

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    let scriptQuery = `Select * from sys_user where email = ${db.escape(
      req.body.email
    )} and password = ${db.escape(req.body.password)}`;
    console.log(req.body);
    db.query(scriptQuery, (err, results) => {
      console.log(results);
      if (err) res.status(500).send(err);
      if (results[0]) {
        let {
          id_user,
          id_warehouse,
          id_role,
          username,
          email,
          password,
          full_name,
          gender,
          birth_date,
          phone,
          address,
          is_valid,
        } = results[0];
        console.log(results[0]);
        let token = createToken({
          id_user,
          id_warehouse,
          id_role,
          username,
          email,
          password,
          full_name,
          gender,
          birth_date,
          phone,
          address,
          is_valid,
        });
        if (is_valid === 0) {
          res.status(404).send({ message: "Your account not verified" });
        } else {
          res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Berhasil" });
        }
      } else {
        res.status(400).send({ message: "email/password not match" });
      }
    });
  },
  addData: (req, res) => {
    let { username, email, password } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex"); //hashing  before store in database
    let insertQuery = `insert into sys_user 
    (id_warehouse, username, email, password, is_valid, created_at, updated_at, deleted_at)
    values (null, ${db.escape(username)}, ${db.escape(email)}, 
    ${db.escape(password)}, 0, now(), now(), null)`;
    console.log(username, email, password);
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      console.log(results);
      if (err) res.status(500).send(err);
      if (results.insertId) {
        //get data
        let getQuery = `Select * from sys_user where id_user = ${results.insertId};`;
        db.query(getQuery, (errGet, resultsGet) => {
          if (errGet) {
            console.log(errGet);
            res.status(500).send(errGet);
          }

          //material for token
          let { id_user, id_role, username, email, password, is_valid } =
            resultsGet[0];
          //create token
          let token = createToken({
            id_user,
            id_role,
            username,
            email,
            password,
            is_valid,
          });

          //configuration for send an email
          let mail = {
            from: `Admin <armerray@gmail.com>`,
            to: `${email}`,
            subject: `Account Verification`,
            html: `<a href='http://localhost:3000/verification/${token}'>Click here for access your account</a>`,
          };

          //send an email
          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                message: "Registeration failed!",
                success: false,
                err: errMail,
              });
            }
            res.status(200).send({
              message: "Registeration success, please check your email!",
              success: true,
            });
          });
        });
      }
    });
  },
  //change status middleware
  verification: (req, res) => {
    console.log(req.user);
    let updateQuery = `Update sys_user set is_valid=1 where id_user = ${req.user.id_user}`;

    db.query(updateQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send({ message: "Acoount Verified", success: true });
    });
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

      if (results[0].password == currentPassword) {
        db.query(updateQuery, (err2, results2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send(results2);
        });
      } else {
        return res.status(500).json({ message: "Current Password is Wrong" });
      }
    });
  },
  keepLogin: (req, res) => {
    let sql = `Select id_user, id_warehouse, id_role, username, email, is_valid from sys_user where id_user= ${db.escape(
      req.id_user
    )}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(data[0]);
    });
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
