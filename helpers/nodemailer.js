const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "4dminPWDHshop@gmail.com",
    pass: "eslzlijncyvzanbf",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
