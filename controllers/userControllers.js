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
        let { id_user, id_warehouse, username, email, password, is_valid } =
          results[0];
        console.log(results[0]);
        let token = createToken({
          id_user,
          id_warehouse,
          username,
          email,
          password,
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
    let insertQuery = `insert into sys_user (id_warehouse, username, email, password, is_valid, created_at, updated_at, deleted_at) values (null, ${db.escape(
      username
    )}, ${db.escape(email)}, ${db.escape(password)}, 0, now(), now(), null)`;
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
          let { id_user, username, email, password, is_valid } = resultsGet[0];
          //create token
          let token = createToken({
            id_user,
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
};
